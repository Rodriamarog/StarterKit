import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user) throw redirect(303, '/dashboard');
	return {
		resetSuccess: url.searchParams.get('reset') === 'success'
	};
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (err: any) {
			return fail(400, { error: err?.data?.message || 'Invalid email or password' });
		}

		const redirectTo = url.searchParams.get('redirect') || '/dashboard';
		throw redirect(303, redirectTo);
	}
};
