# SaaS Starter Kit

A production-ready SvelteKit starter template with authentication, Stripe subscriptions, and email notifications.

## ✨ Features

- 🔐 **Authentication**: Cookie-based sessions with email verification
- 💳 **Stripe Integration**: Subscription payments with webhook support
- 📧 **Email Notifications**: Gmail SMTP for transactional emails
- 💾 **SQLite Database**: Self-hosted, no external dependencies
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS + DaisyUI
- 🚀 **Production Ready**: Secure, tested, and ready to deploy

## 🛠 Tech Stack

- **Framework**: SvelteKit
- **Database**: SQLite with better-sqlite3
- **Authentication**: Custom implementation with bcrypt
- **Payments**: Stripe Checkout + Subscriptions
- **Email**: Nodemailer with Gmail SMTP
- **Styling**: Tailwind CSS + DaisyUI

## 🚀 Quick Start

1. **Clone the template**
2. **Install dependencies**: `npm install`
3. **Follow the setup guide**: See [SETUP.md](./SETUP.md) for detailed configuration

## 📋 What's Included

### Authentication System
- User signup with email verification
- Secure login with bcrypt password hashing
- Cookie-based sessions (30-day expiration)
- Protected routes and middleware

### Stripe Integration
- Subscription checkout flow
- Customer management (prevents duplicates)
- Webhook handling for subscription events
- Support for multiple pricing tiers

### Email System
- Welcome emails
- Email verification links
- Subscription confirmation emails
- Configurable templates

### Pre-built Pages
- Landing page with pricing
- Signup/Login pages
- Dashboard with user info
- Checkout flow

## 📖 Documentation

See [SETUP.md](./SETUP.md) for:
- Step-by-step setup instructions
- Environment variable configuration
- Stripe setup guide
- Gmail SMTP configuration
- Testing procedures
- Deployment checklist

## 🧪 Testing Locally

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Start Stripe webhook listener
stripe listen --forward-to localhost:5173/api/webhooks/stripe
```

Use Stripe test card: `4242 4242 4242 4242`

## 🌍 Environment Variables

Required variables (see [SETUP.md](./SETUP.md) for details):

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your16digitpassword
PUBLIC_APP_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
```

## 📂 Project Structure

```
src/
├── lib/server/        # Server-side logic (auth, db, email)
├── routes/
│   ├── api/          # API endpoints
│   ├── checkout/     # Checkout flow
│   ├── dashboard/    # User dashboard
│   └── +page.svelte  # Landing page
└── hooks.server.ts    # Auth middleware
```

## 🔒 Security Features

- HTTP-only secure cookies
- bcrypt password hashing (10 rounds)
- Stripe webhook signature verification
- Email verification required
- Session expiration (30 days)
- No external auth dependencies

## 📝 License

MIT - Use freely for your projects!

## 🤝 Contributing

This is a personal starter template. Feel free to fork and customize for your needs!

---

**Note**: This is a starter template. Before launching to production, review the security settings, update the branding, and follow the deployment checklist in SETUP.md.
