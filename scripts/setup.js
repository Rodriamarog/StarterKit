#!/usr/bin/env node
// scripts/setup.js — configure PocketBase for this project
// Usage: npm run setup

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Parse .env
const envText = readFileSync(join(root, '.env'), 'utf8');
const env = Object.fromEntries(
	envText
		.split('\n')
		.filter((line) => line && !line.startsWith('#') && line.includes('='))
		.map((line) => {
			const idx = line.indexOf('=');
			return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
		})
);

const PB_URL = env.PUBLIC_POCKETBASE_URL || 'http://localhost:8090';
const ADMIN_EMAIL = env.POCKETBASE_ADMIN_EMAIL;
const ADMIN_PASSWORD = env.POCKETBASE_ADMIN_PASSWORD;

const CUSTOM_FIELDS = [
	{ name: 'subscription_tier', type: 'text' },
	{ name: 'stripe_customer_id', type: 'text' },
	{ name: 'stripe_subscription_id', type: 'text' },
	{ name: 'subscription_status', type: 'text' },
	{ name: 'subscription_updated_at', type: 'date' }
];

async function waitForPocketBase() {
	process.stdout.write('Waiting for PocketBase');
	for (let i = 0; i < 30; i++) {
		try {
			const res = await fetch(`${PB_URL}/api/health`);
			if (res.ok) { console.log(' ready.'); return; }
		} catch {}
		process.stdout.write('.');
		await new Promise((r) => setTimeout(r, 1000));
	}
	console.error('\nPocketBase did not respond. Is it running?');
	process.exit(1);
}

async function main() {
	await waitForPocketBase();

	// Authenticate
	const authRes = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASSWORD })
	});
	if (!authRes.ok) {
		console.error('Failed to authenticate. Check POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD in .env');
		process.exit(1);
	}
	const { token } = await authRes.json();

	// Fetch current users collection schema
	const collectionRes = await fetch(`${PB_URL}/api/collections/users`, {
		headers: { Authorization: token }
	});
	if (!collectionRes.ok) {
		console.error('Failed to fetch users collection');
		process.exit(1);
	}
	const collection = await collectionRes.json();

	// Add missing custom fields
	const existingNames = new Set(collection.fields.map((f) => f.name));
	const newFields = CUSTOM_FIELDS.filter((f) => !existingNames.has(f.name));

	if (newFields.length > 0) {
		const updateRes = await fetch(`${PB_URL}/api/collections/users`, {
			method: 'PATCH',
			headers: { Authorization: token, 'Content-Type': 'application/json' },
			body: JSON.stringify({ fields: [...collection.fields, ...newFields] })
		});
		if (!updateRes.ok) {
			const err = await updateRes.json();
			console.error('Failed to update users collection:', JSON.stringify(err));
			process.exit(1);
		}
		console.log(`✓ Added fields to users collection: ${newFields.map((f) => f.name).join(', ')}`);
	} else {
		console.log('✓ Users collection already has all required fields');
	}

	console.log('\n✓ PocketBase setup complete!');
	console.log('\nFor local Stripe webhook testing:');
	console.log('  stripe listen --forward-to localhost:5173/api/webhooks/stripe\n');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
