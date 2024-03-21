import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { Prisma as prisma } from "$lib/server/prisma";

import type { Actions } from "./$types";

export const actions: Actions = {

	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		console.log("login page : ", username, password);

		const existingUser = await prisma.authUser.findUnique({
            where: {
                username: username.toLowerCase()
            }
        })

		const authKey = !existingUser ? null : await prisma.authKey.findFirst({
				where: {
					userId: existingUser.id,
					primary_key: true
				}
			});

		if (!existingUser || !authKey || !authKey.hashed_password) {
			// NOTE: read docs for security measures
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const validPassword = await new Argon2id().verify(authKey.hashed_password, password);
		if (!validPassword) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}

	// default: async (event) => {
	// 	const formData = await event.request.formData();
	// 	const username = formData.get("username");
	// 	const password = formData.get("password");

	// 	if (
	// 		typeof username !== "string" ||
	// 		username.length < 3 ||
	// 		username.length > 31 ||
	// 		!/^[a-z0-9_-]+$/.test(username)
	// 	) {
	// 		return fail(400, {
	// 			message: "Invalid username"
	// 		});
	// 	}
	// 	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
	// 		return fail(400, {
	// 			message: "Invalid password"
	// 		});
	// 	}

	// 	const existingUser = await prisma.user.findUnique({
    //         where: {
    //             username: username.toLowerCase()
    //         }
    //     })
	// 	if (!existingUser) {
	// 		// NOTE:
	// 		// Returning immediately allows malicious actors to figure out valid usernames from response times,
	// 		// allowing them to only focus on guessing passwords in brute-force attacks.
	// 		// As a preventive measure, you may want to hash passwords even for invalid usernames.
	// 		// However, valid usernames can be already be revealed with the signup page among other methods.
	// 		// It will also be much more resource intensive.
	// 		// Since protecting against this is none-trivial,
	// 		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
	// 		// If usernames are public, you may outright tell the user that the username is invalid.
	// 		return fail(400, {
	// 			message: "Incorrect username or password"
	// 		});
	// 	}

	// 	const validPassword = await new Argon2id().verify(existingUser.hashed_password, password);
	// 	if (!validPassword) {
	// 		return fail(400, {
	// 			message: "Incorrect username or password"
	// 		});
	// 	}

	// 	const session = await lucia.createSession(existingUser.id, {});
	// 	const sessionCookie = lucia.createSessionCookie(session.id);
	// 	event.cookies.set(sessionCookie.name, sessionCookie.value, {
	// 		path: ".",
	// 		...sessionCookie.attributes
	// 	});

	// 	redirect(302, "/");
	// }
};
