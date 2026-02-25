import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const tier = url.searchParams.get('tier');

	if (!tier || !['pro', 'business'].includes(tier)) {
		throw redirect(302, '/');
	}

	if (!locals.user) {
		throw redirect(302, `/login?redirect=${encodeURIComponent('/checkout?tier=' + tier)}`);
	}

	return {
		user: {
			id: locals.user.id,
			email: locals.user.email
		},
		tier
	};
};
