import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { stripe } from '$lib/server/stripe';

const PRICE_IDS: Record<string, string | undefined> = {
	pro: env.STRIPE_PRICE_ID_PRO,
	business: env.STRIPE_PRICE_ID_BUSINESS
};

export const load: PageServerLoad = async ({ locals, url }) => {
	const tier = url.searchParams.get('tier');

	if (!tier || !['pro', 'business'].includes(tier)) {
		throw redirect(302, '/');
	}

	if (!locals.user) {
		throw redirect(302, `/login?redirect=${encodeURIComponent('/checkout?tier=' + tier)}`);
	}

	const priceId = PRICE_IDS[tier];
	if (!priceId) {
		throw error(500, `Price ID for "${tier}" is not configured. Set STRIPE_PRICE_ID_${tier.toUpperCase()} in .env`);
	}

	let customerId = locals.user.stripe_customer_id as string | undefined;
	if (!customerId) {
		const customer = await stripe.customers.create({
			email: locals.user.email,
			metadata: { userId: locals.user.id }
		});
		customerId = customer.id;
		await locals.pb.collection('users').update(locals.user.id, { stripe_customer_id: customerId });
	}

	const session = await stripe.checkout.sessions.create({
		mode: 'subscription',
		customer: customerId,
		line_items: [{ price: priceId, quantity: 1 }],
		success_url: `${env.PUBLIC_APP_URL || 'http://localhost:5173'}/dashboard?success=true`,
		cancel_url: `${env.PUBLIC_APP_URL || 'http://localhost:5173'}?cancelled=true`,
		metadata: { userId: locals.user.id }
	});

	throw redirect(302, session.url!);
};
