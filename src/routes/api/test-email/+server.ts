import { json } from '@sveltejs/kit';
import { sendPasswordResetEmail } from '$lib/server/email';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	if (!email) {
		return json({ error: 'Email is required' }, { status: 400 });
	}

	try {
		const result = await sendPasswordResetEmail(email, 'test-token-123');

		if (result.success) {
			return json({
				success: true,
				message: 'Test email sent successfully! Check your inbox.'
			});
		} else {
			return json({
				success: false,
				error: 'Failed to send email',
				details: result.error
			}, { status: 500 });
		}
	} catch (error: any) {
		return json({
			success: false,
			error: error.message || 'Unknown error',
			details: error
		}, { status: 500 });
	}
};
