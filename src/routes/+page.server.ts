import type { PageServerLoad } from './$types';
import { getSession, getUserById } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('session_id');

	if (!sessionId) {
		return { user: null };
	}

	const session = getSession(sessionId);
	if (!session) {
		return { user: null };
	}

	const user = getUserById(session.user_id);
	if (!user) {
		return { user: null };
	}

	return {
		user: {
			id: user.id,
			email: user.email,
			subscription_tier: user.subscription_tier
		}
	};
};
