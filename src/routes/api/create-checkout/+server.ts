import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { getSession, getUserById } from '$lib/server/auth';
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_SECRET_KEY || '', {
	apiVersion: '2026-01-28.clover'
});

export const POST: RequestHandler = async ({ request, cookies }) => {
	// Get session from cookie
	const sessionId = cookies.get('session_id');
	if (!sessionId) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	const session = getSession(sessionId);
	if (!session) {
		return json({ error: 'Invalid session' }, { status: 401 });
	}

	const user = getUserById(session.user_id);
	if (!user) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	try {
		const body = await request.json();
		const { priceId } = body;

		if (!priceId) {
			return json({ error: 'Price ID required' }, { status: 400 });
		}

		// Get or create Stripe customer
		let customerId = user.stripe_customer_id;

		if (!customerId) {
			// Create a new customer if one doesn't exist
			const customer = await stripe.customers.create({
				email: user.email,
				metadata: {
					userId: user.id.toString()
				}
			});
			customerId = customer.id;

			// Save customer ID to database
			const { updateUserSubscription } = await import('$lib/server/auth');
			updateUserSubscription(user.id, user.subscription_tier, customerId, null, null);
		}

		// Create Stripe checkout session with existing customer
		const checkoutSession = await stripe.checkout.sessions.create({
			mode: 'subscription',
			customer: customerId, // Use existing customer instead of email
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			success_url: `${env.PUBLIC_APP_URL || 'http://localhost:5173'}/dashboard?success=true`,
			cancel_url: `${env.PUBLIC_APP_URL || 'http://localhost:5173'}?cancelled=true`,
			metadata: {
				userId: user.id.toString()
			}
		});

		return json({ url: checkoutSession.url });
	} catch (error) {
		console.error('Error creating checkout session:', error);
		return json({ error: 'Failed to create checkout session' }, { status: 500 });
	}
};
