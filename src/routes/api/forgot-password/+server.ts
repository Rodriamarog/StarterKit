import { json } from '@sveltejs/kit';
import { getUserByEmail, generateResetToken, setResetToken } from '$lib/server/auth';
import { sendPasswordResetEmail } from '$lib/server/email';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	// Validate input
	if (!email) {
		return json({ error: 'Email is required' }, { status: 400 });
	}

	// Check if user exists
	const user = getUserByEmail(email);

	// Always return success to prevent email enumeration
	// But only send email if user exists
	if (user) {
		const resetToken = generateResetToken();
		setResetToken(email, resetToken);

		try {
			await sendPasswordResetEmail(email, resetToken);
		} catch (error) {
			console.error('Failed to send password reset email:', error);
			// Still return success to prevent revealing if email exists
		}
	}

	return json({
		success: true,
		message: 'If an account exists with that email, you will receive a password reset link.'
	});
};
