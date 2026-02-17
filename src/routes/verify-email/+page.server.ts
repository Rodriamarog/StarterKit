import { redirect } from '@sveltejs/kit';
import { verifyEmail, getUserByVerificationToken, createSession } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		return {
			success: false,
			error: 'Invalid verification link'
		};
	}

	// Get user by token
	const user = getUserByVerificationToken(token);

	if (!user) {
		return {
			success: false,
			error: 'Invalid or expired verification token'
		};
	}

	// Verify the email
	const verified = verifyEmail(token);

	if (!verified) {
		return {
			success: false,
			error: 'Verification failed'
		};
	}

	// Create session and log them in
	const session = createSession(user.id);
	cookies.set('session_id', session.id, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30 // 30 days
	});

	return {
		success: true,
		email: user.email
	};
};
