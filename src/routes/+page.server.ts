// import type { PageServerLoad, Actions } from "./$types";
// import { fail, redirect } from "@sveltejs/kit";

// export const load: PageServerLoad = async (event) => {
// 	if (!event.locals.user) redirect(302, "/login");
// 	return {
// 		username: event.locals.user.username
// 	};
// };
import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	// ...
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/login");
	}
};
