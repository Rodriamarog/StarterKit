import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSession, getUserById } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies, url }) => {
	const tier = url.searchParams.get('tier');

	if (!tier || !['pro', 'business'].includes(tier)) {
		throw redirect(302, '/');
	}

	const sessionId = cookies.get('session_id');

	if (!sessionId) {
		// Not logged in - redirect to login with return URL
		throw redirect(302, `/login?redirect=${encodeURIComponent('/checkout?tier=' + tier)}`);
	}

	const session = getSession(sessionId);
	if (!session) {
		throw redirect(302, `/login?redirect=${encodeURIComponent('/checkout?tier=' + tier)}`);
	}

	const user = getUserById(session.user_id);
	if (!user) {
		throw redirect(302, `/login?redirect=${encodeURIComponent('/checkout?tier=' + tier)}`);
	}

	return {
		user: {
			id: user.id,
			email: user.email
		},
		tier
	};
};
