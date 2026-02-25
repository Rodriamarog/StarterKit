import Stripe from 'stripe';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

const secretKey = dev ? env.STRIPE_SECRET_KEY_TEST : env.STRIPE_SECRET_KEY_LIVE;
export const webhookSecret = dev ? env.STRIPE_WEBHOOK_SECRET_TEST : env.STRIPE_WEBHOOK_SECRET_LIVE;

export const stripe = new Stripe(secretKey || '', {
	apiVersion: '2026-01-28.clover'
});
