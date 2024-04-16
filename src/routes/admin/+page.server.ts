import type { PageServerLoad } from './$types';
import { Prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) redirect(302, "/login");
    return {
        username : event.locals.user.username,
        groups : [{name: "admin", id: 1}, {name: "user", id: 2}, {name: "guest", id: 3}],
        // groups : await Prisma.userGroup.findMany({
        //     where: {
        //         NOT: {
        //             name: "admin"
        //         }
        //     }
        // }),
        users : await Prisma.authUser.findMany({
            where: {
                NOT: {
                    userGroup: {
                        some: {
                            name: "admin"
                        }
                    }
                }
            },
            include: {
                userGroup : true
            },
    })
    }
};