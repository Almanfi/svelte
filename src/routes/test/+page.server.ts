import type { Actions, PageServerLoad } from "./$types"
import { fail } from '@sveltejs/kit';
import { Prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/lucia';
import { generateId } from 'lucia';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) redirect(302, "/login");
    return {
        username : event.locals.user.username,
    }
};


export const actions: Actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        for (const key in formData) {
            if (formData[key] === "") {
                formData[key] = undefined;
            }
        }

        // for (const key in formData) {
        //     console.log(key);
        //     if (formData[key])
        //     console.log(formData[key]);
        //     else if (formData[key] === undefined)
        //         console.log('ture undefined');
        //     else
        //         console.log('void');
        //     console.log('---');
        // }
        try {
            console.log(formData);
            return {
                status: 204
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to delete product' });
        }
    }
};