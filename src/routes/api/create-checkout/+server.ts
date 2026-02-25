import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { stripe } from '$lib/server/stripe';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	const user = locals.user;

	try {
		const body = await request.json();
		const { priceId } = body;

		if (!priceId) {
			return json({ error: 'Price ID required' }, { status: 400 });
		}

		// Get or create Stripe customer
		let customerId = user.stripe_customer_id as string | undefined;

		if (!customerId) {
			const customer = await stripe.customers.create({
				email: user.email,
				metadata: { userId: user.id }
			});
			customerId = customer.id;

			await locals.pb.collection('users').update(user.id, {
				stripe_customer_id: customerId
			});
		}

		const checkoutSession = await stripe.checkout.sessions.create({
			mode: 'subscription',
			customer: customerId,
			line_items: [{ price: priceId, quantity: 1 }],
			success_url: `${env.PUBLIC_APP_URL || 'http://localhost:5173'}/dashboard?success=true`,
			cancel_url: `${env.PUBLIC_APP_URL || 'http://localhost:5173'}?cancelled=true`,
			metadata: { userId: user.id }
		});

		return json({ url: checkoutSession.url });
	} catch (error) {
		console.error('Error creating checkout session:', error);
		return json({ error: 'Failed to create checkout session' }, { status: 500 });
	}
};
