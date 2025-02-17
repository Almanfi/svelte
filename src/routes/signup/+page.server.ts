import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import type { Actions } from "./$types";
import { Prisma as prisma } from "$lib/server/prisma";


export const actions: Actions = {
    default: async ( event ) => {
        const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");

		const userId = generateId(15);
		const authKeyId = generateId(15);
        const hashedPassword = await new Argon2id().hash(password);
        const expirationDate = Date.now() + 1000 * 60 * 60 * 24 * 30 * 12 * 2;


		try {
            await prisma.authUser.create({
                data: {
                  id: userId,
                  username: username,
                  name: username,
                  auth_key: {
                    create: {
                        id: authKeyId,
                        hashed_password: hashedPassword,
                        primary_key: true,
                        expires: BigInt(expirationDate),
                    }
                  },
                },
              });
		} catch (err) {
			console.error(err)
			return fail(400, { message: 'Could not register user' })
		}
		throw redirect(302, '/login')
	}



	// default: async (event) => {
	// 	const formData = await event.request.formData();
	// 	const username = formData.get("username");
	// 	const password = formData.get("password");
	// 	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// 	// keep in mind some database (e.g. mysql) are case insensitive
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

	// 	const userId = generateId(15);
	// 	const hashedPassword = await new Argon2id().hash(password);

	// 	// TODO: check if username is already used
    //     await prisma.user.create({
    //         data: {
    //             id: userId,
    //             username: username,
    //             hashed_password: hashedPassword
    //         }
    //     });

	// 	const session = await lucia.createSession(userId, {});
	// 	const sessionCookie = lucia.createSessionCookie(session.id);
	// 	event.cookies.set(sessionCookie.name, sessionCookie.value, {
	// 		path: ".",
	// 		...sessionCookie.attributes
	// 	});

	// 	redirect(302, "/");
	// }
};
