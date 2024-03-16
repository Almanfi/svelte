import type { Actions, PageServerLoad } from "./$types"
import { fail } from '@sveltejs/kit';
import { Prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
    return {
        articles : await Prisma.article.findMany()
    }
};

export const actions: Actions = {
    createArticle: async ({request}) => {
        const { title, content } = Object.fromEntries(await request.formData()) as {
            title: string,
            content: string
        };

        try {
            const article = await Prisma.article.create({
                data: {
                    title,
                    content
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
    deleteArticle: async ({url}) => {
        const id = url.searchParams.get("id");
        if (!id) {
            return fail(400, { message: 'Missing id' });
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