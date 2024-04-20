import type { PageServerLoad, Actions } from './$types';
import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { Prisma as prisma } from "$lib/server/prisma";


export const load: PageServerLoad = async (event) => {
    let user = event.locals.user;
    return {
            title: 'User Page',
            name: user.username,
    };
};

export const actions: Actions = {
  updateInfo: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("name");
    const email = formData.get("email");
    
    const user = event.locals?.user;
    if (!user)
        return fail(500, { message: 'internal server errror' });
    console.log(user);
    try {
        const dbUser =  await prisma.authUser.update({
                where: {
                    id: user.id
                },
                data: {
                    username,
                    email
                }
            });
        return {
            status: 200
        };
    } catch (err) {
      console.error(err)
      return fail(400, { message: 'Could not change uer info' })
    }
  },
  updatePass: async (event) => {
    const formData = await event.request.formData();
    const oldPass = formData.get("oldPass");
    const newPass = formData.get("newPass");
    const newPass2 = formData.get("newPass2");

    if (newPass !== newPass2)
        return fail(400, { message: 'Passwords do not match' });

    const user = event.locals?.user;
    if (!user)
        return fail(500, { message: 'internal server errror' });
    const oldHashedPass = await new Argon2id().hash(oldPass);
    const newHashedPass = await new Argon2id().hash(newPass);
    console.log(user);
    try {
        const dbUser =  await prisma.authUser.findFirst({
                where: {
                    id: user.id
                },
                include: {
                    auth_key: true
                },
        });
        if (!dbUser)
            return fail(400, { message: 'Could not find user' });

        if (!dbUser.auth_key[0]?.hashed_password)
            return fail(500, { message: 'internal server error' });
        const authKey = dbUser.auth_key[0];

		const validPassword = await new Argon2id().verify(authKey.hashed_password as string, oldPass);
		if (!validPassword) {
			return fail(400, {
				message: "Old password is wrong!"
			});
		}

        await prisma.authKey.update({
                where: {
                    id: dbUser.auth_key[0].id,
                },
                data: {
                    hashed_password: newHashedPass
                }
            });
        return {
            status: 200
        };
    } catch (err) {
      console.error(err)
      return fail(400, { message: 'Could not change uer info' })
    }
  },
};
