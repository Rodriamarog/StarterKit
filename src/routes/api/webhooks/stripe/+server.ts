import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import PocketBase from 'pocketbase';
import { stripe, webhookSecret } from '$lib/server/stripe';
import type Stripe from 'stripe';

async function getAdminPb() {
	const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL || 'http://localhost:8090');
	await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL || '', env.POCKETBASE_ADMIN_PASSWORD || '');
	return pb;
}

export const POST: RequestHandler = async ({ request }) => {
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		return json({ error: 'No signature' }, { status: 400 });
	}

	if (!webhookSecret) {
		console.error('Stripe webhook secret not configured');
		return json({ error: 'Webhook secret not configured' }, { status: 500 });
	}

	let event: Stripe.Event;

	try {
		const body = await request.text();
		event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
	} catch (err) {
		console.error('Webhook signature verification failed:', err);
		return json({ error: 'Invalid signature' }, { status: 400 });
	}

	try {
		switch (event.type) {
			case 'checkout.session.completed': {
				const session = event.data.object as Stripe.Checkout.Session;
				await handleCheckoutComplete(session);
				break;
			}
			case 'customer.subscription.updated': {
				const subscription = event.data.object as Stripe.Subscription;
				await handleSubscriptionUpdated(subscription);
				break;
			}
			case 'customer.subscription.deleted': {
				const subscription = event.data.object as Stripe.Subscription;
				await handleSubscriptionDeleted(subscription);
				break;
			}
			default:
				console.log(`Unhandled event type: ${event.type}`);
		}

		return json({ received: true });
	} catch (error) {
		console.error('Error processing webhook:', error);
		return json({ error: 'Webhook processing failed' }, { status: 500 });
	}
};

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
	const customerEmail = session.customer_email || session.customer_details?.email;

	if (!customerEmail) {
		console.error('No customer email in checkout session');
		return;
	}

	const pb = await getAdminPb();
	let user;
	try {
		user = await pb.collection('users').getFirstListItem(`email="${customerEmail}"`);
	} catch {
		console.error(`User not found for email: ${customerEmail}`);
		return;
	}

	const subscriptionId = session.subscription as string;
	const customerId = session.customer as string;
	const subscription = await stripe.subscriptions.retrieve(subscriptionId);
	const tier = getTierFromPrice(subscription.items.data[0]?.price.unit_amount || 0);

	await pb.collection('users').update(user.id, {
		subscription_tier: tier,
		stripe_customer_id: customerId,
		stripe_subscription_id: subscriptionId,
		subscription_status: 'active',
		subscription_updated_at: new Date().toISOString()
	});
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
	const customerId = subscription.customer as string;

	const pb = await getAdminPb();
	let user;
	try {
		user = await pb.collection('users').getFirstListItem(`stripe_customer_id="${customerId}"`);
	} catch {
		console.error(`User not found for customer: ${customerId}`);
		return;
	}

	const tier = getTierFromPrice(subscription.items.data[0]?.price.unit_amount || 0);

	await pb.collection('users').update(user.id, {
		subscription_tier: tier,
		stripe_subscription_id: subscription.id,
		subscription_status: subscription.status,
		subscription_updated_at: new Date().toISOString()
	});
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
	const customerId = subscription.customer as string;

	const pb = await getAdminPb();
	let user;
	try {
		user = await pb.collection('users').getFirstListItem(`stripe_customer_id="${customerId}"`);
	} catch {
		console.error(`User not found for customer: ${customerId}`);
		return;
	}

	await pb.collection('users').update(user.id, {
		subscription_tier: 'free',
		subscription_status: 'cancelled',
		subscription_updated_at: new Date().toISOString()
	});
}

function getTierFromPrice(amount: number): 'free' | 'pro' | 'business' {
	if (amount >= 60000) return 'business';
	if (amount >= 20000) return 'pro';
	return 'free';
}
