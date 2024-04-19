// src/hooks.server.ts
import { lucia } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { Prisma as prisma } from '$lib/server/prisma';

export const handle: Handle = async ({ event, resolve }) => {
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
	if (user) {
		let userInDb = await prisma.authUser.findUnique({
			where: {
				id: user.id
			},
			include: {
				userGroup: true
			}
		});
		let userData = null;
		if (userInDb)
			event.locals.user = {
				id: userInDb.id,
				username: userInDb.username,
				group: userInDb.userGroup.map((group) => group.name),
			};
	}
	event.locals.session = session;
	return resolve(event);
};
