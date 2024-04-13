// src/hooks.server.ts
import { lucia } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	if (process.env.VAPID_PUBLIC_KEY)
		console.log("+vapid public key", process.env.VAPID_PUBLIC_KEY);
	else
		console.log("-vapid public key not set");

	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		if (event.url.pathname !== "/login"
			&& event.url.pathname !== "/signup"
			&& event.url.pathname !== "/createAdmin")
			redirect(302, "/login");
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
	
	const { session, user } = await lucia.validateSession(sessionId);
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
	return resolve(event);
};
