import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	return {
		isValid: locals.pb.authStore.isValid,
		user: locals.user ?? null,
		url: url.toString()
	};
};
