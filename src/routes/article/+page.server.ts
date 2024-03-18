import type { Actions, PageServerLoad } from "./$types"
import { fail } from '@sveltejs/kit';
import { Prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/lucia';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) redirect(302, "/login");
    return {
        username : event.locals.user.username,
        articles : await Prisma.article.findMany()
    }
};


export const actions: Actions = {
    createArticle: async ( event ) => {

        const { title, content } = Object.fromEntries(await event.request.formData()) as {
            title: string,
            content: string,
        };

        try {
            console.log(event.locals.user)
            let userId = event.locals.user.id;
            const article = await Prisma.article.create({
                data: {
                    title,
                    content,
                    auth_user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            return {
                status: 201,
                body: article
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to create article' });
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