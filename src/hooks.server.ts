import { getSession, getUserById } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get session ID from cookie
	const sessionId = event.cookies.get('session_id');

	if (sessionId) {
		const session = getSession(sessionId);
		if (session) {
			const user = getUserById(session.user_id);
			if (user) {
				// Add user to locals (available in all server-side code)
				event.locals.user = {
					id: user.id,
					email: user.email,
					subscription_tier: user.subscription_tier
				};
			}
		}
	}

	return resolve(event);
};
