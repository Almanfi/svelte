import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import type { Actions } from "./$types";
import { Prisma as prisma } from "$lib/server/prisma";

export const actions: Actions = {
  default: async (event) => {
    const oldAdmin = await prisma.authUser.findFirst({
      where: {
        userGroup: {
          some: {
            groupPermision: {
              some: {
                name: 'admin'
              }
            }
          }
        }
      }
    });
    if (oldAdmin) {
      return fail(400, { message: 'Admin already exists' })
    }
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    const userId = generateId(15);
    const groupId = generateId(15);
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

          userGroup: {
            create: {
              id: groupId,
              name: 'admin',

              groupPermision: {
                create: {
                  name: 'admin',
                }
              }

            }
          }

        },
      });
    } catch (err) {
      console.error(err)
      return fail(400, { message: 'Could not register user' })
    }
    throw redirect(302, '/login')
  }
};
