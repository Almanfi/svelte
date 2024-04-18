import type { PageServerLoad } from './$types';
import { Prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) redirect(302, "/login");
    return {
        username : event.locals.user.username,
        products : await Prisma.product.findMany({
            include: {
                versions: true,
                client: true,
            },
    })
    }
};