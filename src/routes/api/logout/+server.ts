import { json } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/auth';
import type { RequestHandler} from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session_id');

	if (sessionId) {
		deleteSession(sessionId);
	}

	// Clear session cookie
	cookies.delete('session_id', { path: '/' });

	return json({ success: true });
};
