import { json } from '@sveltejs/kit';
import { verifyLogin, createSession } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password } = await request.json();

	// Validate input
	if (!email || !password) {
		return json({ error: 'Email and password are required' }, { status: 400 });
	}

	// Verify login
	const user = await verifyLogin(email, password);
	if (!user) {
		return json({ error: 'Invalid email or password' }, { status: 401 });
	}

	// Check if email is verified
	if (!user.email_verified) {
		return json({ error: 'Please verify your email address before logging in' }, { status: 403 });
	}

	// Create session
	const session = createSession(user.id);

	// Set session cookie
	cookies.set('session_id', session.id, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30 // 30 days
	});

	return json({
		success: true,
		user: {
			id: user.id,
			email: user.email
		}
	});
};
