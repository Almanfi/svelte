// src/hooks.server.ts
import { lucia } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		console.log("in no session id")
		console.log(event.url.pathname)
		if (event.url.pathname !== "/login"
			&& event.url.pathname !== "/signup"
			&& event.url.pathname !== "/createAdmin")
			redirect(302, "/login");
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
	console.log("in session id")
	console.log(sessionId);
	
	const { session, user } = await lucia.validateSession(sessionId);
	console.log("done validating session")
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	if (!session) {
		console.log("in no session")
		console.log(event.url.pathname)
		if (event.url.pathname !== "/login"  && event.url.pathname !== "/signup") redirect(302, "/login");
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	console.log("done setting locals")
	return resolve(event);
};
