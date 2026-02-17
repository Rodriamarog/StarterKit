import { json } from '@sveltejs/kit';
import { resetPassword } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { token, password } = await request.json();

	// Validate input
	if (!token || !password) {
		return json({ error: 'Token and password are required' }, { status: 400 });
	}

	if (password.length < 6) {
		return json({ error: 'Password must be at least 6 characters' }, { status: 400 });
	}

	// Reset password
	const success = await resetPassword(token, password);

	if (!success) {
		return json({ error: 'Invalid or expired reset token' }, { status: 400 });
	}

	return json({
		success: true,
		message: 'Password reset successfully'
	});
};
