# PocketBase JavaScript SDK (v0.26.x)

> Source: https://github.com/pocketbase/js-sdk
> SDK version used in this project: 0.26.8
> PocketBase server: v0.23+ (uses `_superusers` collection for admin auth)

---

## Installation

```js
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');
```

---

## ⚠️ Breaking Changes vs Older Versions

| Old (pre-v0.22) | New (v0.22+) | Notes |
|---|---|---|
| `pb.admins.authWithPassword()` | `pb.collection('_superusers').authWithPassword()` | soft-deprecated alias still works but warns |
| `pb.authStore.model` | `pb.authStore.record` | soft-deprecated, still works but warns |
| `pb.authStore.isAdmin` | `pb.authStore.isSuperuser` | soft-deprecated |

---

## Auth Store

```js
pb.authStore.record      // RecordModel|null — the authenticated user
pb.authStore.token       // string — the auth token
pb.authStore.isValid     // boolean — token exists and not expired
pb.authStore.isSuperuser // boolean — true if logged in as _superusers

pb.authStore.clear()                    // logout
pb.authStore.save(token, record)        // manually set auth state
pb.authStore.onChange(callback, fireImmediately?)  // listen for changes

// SSR cookie helpers
pb.authStore.loadFromCookie(cookieHeader, key = 'pb_auth')
pb.authStore.exportToCookie(options = {}, key = 'pb_auth')
```

---

## SvelteKit SSR Integration (hooks.server.ts)

The official recommended pattern:

```ts
import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase('http://127.0.0.1:8090');
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh();
            event.locals.user = event.locals.pb.authStore.record; // NOTE: .record not .model
        }
    } catch {
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());
    return response;
};
```

---

## Admin / Superuser Auth (server-side only)

```ts
// v0.22+ — use _superusers collection
const pb = new PocketBase('http://127.0.0.1:8090');
await pb.collection('_superusers').authWithPassword('admin@example.com', 'password');

// then use pb as admin for privileged operations
const user = await pb.collection('users').getFirstListItem('email="foo@bar.com"');
```

---

## Record CRUD

```js
// List with pagination
pb.collection('example').getList(page = 1, perPage = 30, options = {});

// All records at once
pb.collection('example').getFullList(options = {});

// First match
pb.collection('example').getFirstListItem(filter, options = {});

// Single by ID
pb.collection('example').getOne(recordId, options = {});

// Create
pb.collection('example').create(bodyParams = {}, options = {});

// Update
pb.collection('example').update(recordId, bodyParams = {}, options = {});

// Delete
pb.collection('example').delete(recordId, options = {});
```

### Safe filter binding (use for untrusted input)

```js
pb.collection('users').getFirstListItem(
    pb.filter('email = {:email}', { email: userInput })
);
```

---

## Auth Collection Methods

```js
// Login
pb.collection('users').authWithPassword(emailOrUsername, password, options = {});

// Refresh current session
pb.collection('users').authRefresh(options = {});

// Registration
pb.collection('users').create({ email, password, passwordConfirm });

// Request email verification
pb.collection('users').requestVerification(email);

// Confirm email verification (token comes from the verification email link)
pb.collection('users').confirmVerification(token);

// Request password reset email
pb.collection('users').requestPasswordReset(email);

// Confirm password reset (token comes from the reset email link)
pb.collection('users').confirmPasswordReset(token, newPassword, newPasswordConfirm);

// Request email change
pb.collection('users').requestEmailChange(newEmail);

// Confirm email change
pb.collection('users').confirmEmailChange(token, currentPassword);
```

---

## Collection Schema Management (Admin API via HTTP)

> Use when you need to add/modify fields programmatically. The JS SDK does not expose collection schema management — use raw `fetch` with the admin token.

```bash
# Authenticate
TOKEN=$(curl -s -X POST "http://localhost:8090/api/collections/_superusers/auth-with-password" \
  -H "Content-Type: application/json" \
  -d '{"identity":"admin@example.com","password":"password"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

# PATCH collection fields
# WARNING: fields array replaces ALL non-system custom fields — include existing ones!
curl -X PATCH "http://localhost:8090/api/collections/users" \
  -H "Authorization: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": [
      {"name":"name","type":"text","required":false},
      {"name":"avatar","type":"file","required":false},
      {"name":"my_new_field","type":"text","required":false}
    ]
  }'
```

System fields (`id`, `email`, `password`, `tokenKey`, `emailVisibility`, `verified`) are always preserved and do not need to be included.

### Field type reference

| type | example |
|------|---------|
| `text` | `{"name":"x","type":"text","required":false}` |
| `number` | `{"name":"x","type":"number","required":false}` |
| `bool` | `{"name":"x","type":"bool","required":false}` |
| `date` | `{"name":"x","type":"date","required":false}` |
| `file` | `{"name":"x","type":"file","required":false,"options":{"maxSelect":1,"maxSize":5242880}}` |
| `relation` | `{"name":"x","type":"relation","required":false,"options":{"collectionId":"...","maxSelect":1}}` |

---

## Realtime Subscriptions

```js
// Subscribe to all changes in a collection
pb.collection('posts').subscribe('*', (e) => {
    console.log(e.action); // "create" | "update" | "delete"
    console.log(e.record);
});

// Subscribe to a specific record
pb.collection('posts').subscribe('RECORD_ID', callback);

// Unsubscribe
pb.collection('posts').unsubscribe();
```

---

## Error Handling

```js
try {
    const result = await pb.collection('users').authWithPassword(email, password);
} catch (error) {
    // error is ClientResponseError
    console.log(error.status);   // HTTP status code
    console.log(error.response); // API JSON error body
    console.log(error.message);  // human readable message
}
```

---

## Files

```js
// Get a public file URL
pb.files.getURL(record, filename);
pb.files.getURL(record, filename, { thumb: '100x100' }); // with thumbnail

// Get a private file token (for protected files)
const token = await pb.files.getToken();
pb.files.getURL(record, filename, { token });
```

---

## TypeScript Generics

```ts
interface User {
    id: string;
    email: string;
    subscription_tier: string;
    stripe_customer_id: string;
}

// Per-call typing
const user = await pb.collection('users').getOne<User>('RECORD_ID');

// Or type the whole client
interface TypedPocketBase extends PocketBase {
    collection(idOrName: 'users'): RecordService<User>;
}
const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketBase;
```
