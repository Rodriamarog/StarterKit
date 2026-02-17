import type { PageServerLoad } from './$types';
import { getSession, getUserById } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies, url }) => {
	const sessionId = cookies.get('session_id');
	const allCookies = Object.fromEntries(
		Object.entries(cookies.getAll()).map(([k, v]) => [k, v])
	);

	let sessionData = null;
	let userData = null;

	if (sessionId) {
		const session = getSession(sessionId);
		if (session) {
			sessionData = session;
			const user = getUserById(session.user_id);
			if (user) {
				userData = {
					id: user.id,
					email: user.email,
					subscription_tier: user.subscription_tier
				};
			}
		}
	}

	return {
		cookies: allCookies,
		sessionId,
		session: sessionData,
		user: userData,
		url: url.toString()
	};
};
