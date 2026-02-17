import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import {
	getUserByEmail,
	getUserByStripeCustomerId,
	updateUserSubscription
} from '$lib/server/auth';
import { sendEmail } from '$lib/server/email';
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_SECRET_KEY || '', {
	apiVersion: '2026-01-28.clover'
});

export const POST: RequestHandler = async ({ request }) => {
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		return json({ error: 'No signature' }, { status: 400 });
	}

	let event: Stripe.Event;

	try {
		const body = await request.text();
		const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

		if (!webhookSecret) {
			console.error('STRIPE_WEBHOOK_SECRET not configured');
			return json({ error: 'Webhook secret not configured' }, { status: 500 });
		}

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

	const user = getUserByEmail(customerEmail);
	if (!user) {
		console.error(`User not found for email: ${customerEmail}`);
		return;
	}

	const subscriptionId = session.subscription as string;
	const customerId = session.customer as string;

	// Fetch subscription to get the price and tier
	const subscription = await stripe.subscriptions.retrieve(subscriptionId);
	const priceId = subscription.items.data[0]?.price.id;

	// Determine tier based on price amount
	const tier = getTierFromPrice(subscription.items.data[0]?.price.unit_amount || 0);

	// Update user subscription in database
	updateUserSubscription(user.id, tier, customerId, subscriptionId, 'active');

	// Send welcome email
	await sendSubscriptionEmail(
		customerEmail,
		'welcome',
		tier,
		subscription.items.data[0]?.price.unit_amount || 0
	);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
	const customerId = subscription.customer as string;
	const user = getUserByStripeCustomerId(customerId);

	if (!user) {
		console.error(`User not found for customer: ${customerId}`);
		return;
	}

	const tier = getTierFromPrice(subscription.items.data[0]?.price.unit_amount || 0);
	const previousTier = user.subscription_tier;

	updateUserSubscription(
		user.id,
		tier,
		customerId,
		subscription.id,
		subscription.status
	);

	// Send email if tier changed
	if (previousTier !== tier) {
		const emailType = getTierLevel(tier) > getTierLevel(previousTier) ? 'upgrade' : 'downgrade';
		await sendSubscriptionEmail(
			user.email,
			emailType,
			tier,
			subscription.items.data[0]?.price.unit_amount || 0
		);
	}
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
	const customerId = subscription.customer as string;
	const user = getUserByStripeCustomerId(customerId);

	if (!user) {
		console.error(`User not found for customer: ${customerId}`);
		return;
	}

	updateUserSubscription(user.id, 'free', customerId, null, 'cancelled');

	await sendSubscriptionEmail(user.email, 'cancelled', user.subscription_tier, 0);
}

function getTierFromPrice(amount: number): 'free' | 'pro' | 'business' {
	// Amount is in cents (MXN)
	// Pro = 20000 cents (200 MXN), Business = 60000 cents (600 MXN)
	if (amount >= 60000) return 'business';
	if (amount >= 20000) return 'pro';
	return 'free';
}

function getTierLevel(tier: 'free' | 'pro' | 'business'): number {
	const levels = { free: 0, pro: 1, business: 2 };
	return levels[tier];
}

async function sendSubscriptionEmail(
	email: string,
	type: 'welcome' | 'upgrade' | 'downgrade' | 'cancelled',
	tier: 'free' | 'pro' | 'business',
	amount: number
) {
	const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
	const amountMXN = (amount / 100).toFixed(2);

	const subjects = {
		welcome: `¡Bienvenido al plan ${tierName}!`,
		upgrade: `Tu plan ha sido actualizado a ${tierName}`,
		downgrade: `Tu plan ha cambiado a ${tierName}`,
		cancelled: 'Tu suscripción ha sido cancelada'
	};

	const messages = {
		welcome: `
			<h2>¡Gracias por suscribirte!</h2>
			<p>Tu suscripción al plan <strong>${tierName}</strong> está activa.</p>
			<p>Precio: $${amountMXN} MXN/mes</p>
			<p>Ahora tienes acceso a todas las funciones de este plan.</p>
		`,
		upgrade: `
			<h2>¡Tu plan ha sido actualizado!</h2>
			<p>Ahora estás en el plan <strong>${tierName}</strong>.</p>
			<p>Nuevo precio: $${amountMXN} MXN/mes</p>
			<p>Disfruta de las nuevas funciones disponibles.</p>
		`,
		downgrade: `
			<h2>Tu plan ha cambiado</h2>
			<p>Tu suscripción ahora está en el plan <strong>${tierName}</strong>.</p>
			<p>Nuevo precio: $${amountMXN} MXN/mes</p>
		`,
		cancelled: `
			<h2>Suscripción cancelada</h2>
			<p>Tu suscripción ha sido cancelada y volverás al plan gratuito.</p>
			<p>Gracias por haber sido parte de Alertas.</p>
		`
	};

	await sendEmail(email, subjects[type], messages[type]);
}
