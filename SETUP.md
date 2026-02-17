# SaaS Starter Kit - Setup Guide

This is a SvelteKit-based SaaS starter template with authentication, Stripe payments, and email notifications already configured. Follow this guide to set up a new project.

## 🚀 Quick Start Checklist

- [ ] Gmail SMTP Configuration
- [ ] Stripe Setup (Products, Prices, Webhooks)
- [ ] Environment Variables
- [ ] Database Initialization
- [ ] Test the Complete Flow

---

## 1. Gmail SMTP Configuration

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/security
2. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter name: "Your Project Name"
5. Click **Generate**
6. Copy the **16-character app password** (no spaces)

### Step 3: Update .env File
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your16digitpassword
```

---

## 2. Stripe Setup

### Step 1: Create Stripe Account
1. Go to: https://stripe.com
2. Sign up or log in to your Stripe account
3. Make sure you're in **Test Mode** (toggle in top right)

### Step 2: Get API Keys
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy your **Secret Key** (starts with `sk_test_`)
3. Update in `.env`:
```env
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Step 3: Create Products and Prices

#### Using Stripe CLI (Recommended):
```bash
# Install Stripe CLI if not already installed
# https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Create Pro Product
stripe products create \
  --name="Your App Pro" \
  --description="Professional plan"

# Copy the product ID (prod_xxx) and create price
stripe prices create \
  --product=prod_xxx \
  --currency=mxn \
  --unit-amount=20000 \
  --recurring.interval=month

# Copy the price ID (price_xxx)

# Create Business Product
stripe products create \
  --name="Your App Business" \
  --description="Business plan"

# Copy the product ID (prod_xxx) and create price
stripe prices create \
  --product=prod_xxx \
  --currency=mxn \
  --unit-amount=60000 \
  --recurring.interval=month

# Copy the price ID (price_xxx)
```

#### Update Price IDs in Code:
Edit `src/routes/checkout/+page.svelte`:
```typescript
const PRICE_IDS = {
    pro: 'price_xxx',      // Your Pro price ID
    business: 'price_xxx'  // Your Business price ID
};
```

### Step 4: Setup Webhook for Local Development

#### Get Webhook Secret:
```bash
# Start Stripe webhook listener
stripe listen --forward-to localhost:5173/api/webhooks/stripe

# This will output a webhook signing secret (whsec_xxx)
# Copy it and add to .env:
```

```env
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

**Important**: Keep the `stripe listen` command running in a separate terminal while testing locally.

#### For Production:
1. Go to: https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Enter your URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret and update production environment

---

## 3. Environment Variables

Create or update your `.env` file with all required variables:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your16digitapppassword

# App URL (for verification links and redirects)
PUBLIC_APP_URL=http://localhost:5173

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### For Production:
- Update `PUBLIC_APP_URL` to your production domain
- Use production Stripe keys (start with `sk_live_`)
- Use production webhook secret from Stripe dashboard

---

## 4. Database Initialization

The database is automatically initialized on first run. The schema includes:

**Users Table:**
- Authentication (email, password_hash)
- Email verification (email_verified, verification_token)
- Subscription tracking (subscription_tier, stripe_customer_id, stripe_subscription_id, subscription_status)

**Sessions Table:**
- Session management (session_id, user_id, expires_at)

### Database Location:
`database.db` (SQLite file in project root)

### Reset Database (if needed):
```bash
rm database.db
# Database will be recreated on next app start
```

---

## 5. Update Branding

### Update App Name and Branding:
1. `src/routes/+page.svelte` - Landing page
2. `src/routes/dashboard/+page.svelte` - Dashboard
3. `src/lib/server/email.ts` - Email templates
4. Product names in Stripe (as shown in Step 2)

### Update Pricing:
1. Update amounts in Stripe (Step 2)
2. Update pricing display on landing page: `src/routes/+page.svelte`
3. Update currency if needed (default: MXN)

---

## 6. Testing the Complete Flow

### Start Development Server:
```bash
npm run dev
```

### In a separate terminal, start Stripe webhook listener:
```bash
stripe listen --forward-to localhost:5173/api/webhooks/stripe
```

### Test Signup Flow:
1. Go to http://localhost:5173
2. Click "Sign up"
3. Create account with your email
4. Check email for verification link
5. Click verification link

### Test Checkout Flow:
1. Click "Subscribe now" on a pricing plan
2. Use Stripe test card: `4242 4242 4242 4242`
3. Enter any future expiry date and CVC
4. Complete checkout
5. Verify:
   - Redirect to dashboard
   - Subscription tier updated on dashboard
   - Confirmation email received
   - Stripe CLI shows webhook events

### Stripe Test Cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Authentication required: `4000 0025 0000 3155`

---

## 7. File Structure Overview

```
src/
├── lib/
│   └── server/
│       ├── auth.ts          # User authentication logic
│       ├── db.ts            # Database initialization
│       └── email.ts         # Email sending functions
├── routes/
│   ├── api/
│   │   ├── create-checkout/ # Stripe checkout session creation
│   │   ├── login/           # Login endpoint
│   │   ├── logout/          # Logout endpoint
│   │   ├── signup/          # Signup endpoint
│   │   ├── verify-email/    # Email verification endpoint
│   │   └── webhooks/
│   │       └── stripe/      # Stripe webhook handler
│   ├── checkout/            # Checkout page
│   ├── dashboard/           # User dashboard
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   └── +page.svelte         # Landing page
└── hooks.server.ts          # SvelteKit hooks (auth middleware)
```

---

## 8. Important Notes

### Cookie-Based Authentication:
- Sessions stored in SQLite
- HttpOnly cookies for security
- 30-day session expiration

### Stripe Customer Management:
- One Stripe customer per user email
- Customer ID stored in database
- Prevents duplicate customers

### Email Verification:
- Required before accessing dashboard
- Verification tokens expire (implement expiration if needed)

### Webhook Security:
- Webhook signatures are verified
- Only processes events from your Stripe account
- Handles idempotency automatically

---

## 9. Common Issues & Solutions

### "No such price" Error:
- Make sure you're using the correct Stripe account
- Verify `stripe login` matches the API key in `.env`
- Check that prices exist: `stripe prices list`

### Webhooks Not Firing:
- Ensure `stripe listen` is running
- Check webhook secret matches in `.env`
- Verify webhook events in Stripe CLI output

### Email Not Sending:
- Verify 16-digit app password is correct (no spaces)
- Check 2FA is enabled on Gmail account
- Test with: `node -e "console.log(process.env.GMAIL_APP_PASSWORD)"` after loading .env

### Database Issues:
- Check `database.db` file exists and has correct permissions
- Reset database: `rm database.db` and restart app

---

## 10. Deployment Checklist

Before deploying to production:

- [ ] Switch to production Stripe keys
- [ ] Update `PUBLIC_APP_URL` to production domain
- [ ] Set up production webhook endpoint in Stripe dashboard
- [ ] Use production Gmail credentials or proper SMTP service
- [ ] Enable HTTPS (required for secure cookies)
- [ ] Set `secure: true` in cookie options for production
- [ ] Back up database regularly
- [ ] Set up monitoring for webhook failures
- [ ] Test complete flow in production

---

## 🎉 You're All Set!

Your SaaS starter kit is ready to use. Simply:
1. Clone this template
2. Follow steps 1-3 above
3. Update branding (step 5)
4. Start building your unique features!

For questions or issues, refer to:
- Stripe Docs: https://stripe.com/docs
- SvelteKit Docs: https://kit.svelte.dev/docs
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
