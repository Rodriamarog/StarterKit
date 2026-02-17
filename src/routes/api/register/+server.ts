import { json } from '@sveltejs/kit';
import { createUser, generateVerificationToken, setVerificationToken } from '$lib/server/auth';
import { sendVerificationEmail } from '$lib/server/email';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();

	// Validate input
	if (!email || !password) {
		return json({ error: 'Email and password are required' }, { status: 400 });
	}

	if (password.length < 6) {
		return json({ error: 'Password must be at least 6 characters' }, { status: 400 });
	}

	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return json({ error: 'Invalid email format' }, { status: 400 });
	}

	// Create user (unverified)
	const user = await createUser(email, password);
	if (!user) {
		return json({ error: 'Email already exists' }, { status: 400 });
	}

	// Generate verification token
	const verificationToken = generateVerificationToken();
	setVerificationToken(user.id, verificationToken);

	// Send verification email
	await sendVerificationEmail(email, verificationToken);

	return json({
		success: true,
		message: 'Account created. Please check your email to verify your account.',
		user: {
			id: user.id,
			email: user.email
		}
	});
};
