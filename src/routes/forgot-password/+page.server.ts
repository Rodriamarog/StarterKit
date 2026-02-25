import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		try {
			await locals.pb.collection('users').requestPasswordReset(email);
		} catch {
			// silently succeed to avoid email enumeration
		}

		return { success: true, email };
	}
};
