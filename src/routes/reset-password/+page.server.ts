import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const data = await request.formData();
		const token = data.get('token') as string;
		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirm') as string;

		if (!token) return fail(400, { error: 'Invalid reset link' });
		if (password !== passwordConfirm) return fail(400, { error: 'Passwords do not match' });
		if (password.length < 8) return fail(400, { error: 'Password must be at least 8 characters' });

		try {
			await locals.pb.collection('users').confirmPasswordReset(token, password, passwordConfirm);
		} catch (err: any) {
			return fail(400, { error: err?.data?.message || 'Failed to reset password' });
		}

		throw redirect(303, '/login?reset=success');
	}
};
