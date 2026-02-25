import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirm') as string;

		if (password !== passwordConfirm) {
			return fail(400, { error: 'Passwords do not match' });
		}

		if (password.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters' });
		}

		try {
			await locals.pb.collection('users').create({ email, password, passwordConfirm });
			await locals.pb.collection('users').requestVerification(email);
		} catch (err: any) {
			return fail(400, { error: err?.data?.message || 'Registration failed' });
		}

		return { success: true, email };
	}
};
