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
        clients : await Prisma.client.findMany({
            include: {
                products: true
            }
        })
    }
};


export const actions: Actions = {
    createClient: async ( event ) => {
        const { name, email } = Object.fromEntries(await event.request.formData()) as {
            name: string,
            email: string,
        };
        
        try {
            const id = generateId(15);
            const client = await Prisma.client.create({
                data: {
                    id,
                    name,
                    email,
                }
            });
            return {
                status: 201,
                body: client
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to create client' });
        }
    },
    deleteArticle: async ( event ) => {
        const id = event.url.searchParams.get("id");
        if (!id) {
            return fail(400, { message: 'Missing id' });
        }
        let article = await Prisma.article.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!article) {
            return fail(500, { message: 'Article not found' });
        }
        let userId = event.locals.user.id;
        if (article.userId !== userId) {
            return fail(403, { message: 'Unauthorized' });
        }
        try {
            await Prisma.article.delete({
                where: {
                    id: Number(id)
                }
            });
            return {
                status: 204
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to delete article' });
        }
    }
};