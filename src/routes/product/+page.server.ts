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
        clients : await Prisma.client.findMany()
    }
};


export const actions: Actions = {
    createProduct: async ( event ) => {
        const { name, clientId } = Object.fromEntries(await event.request.formData()) as {
            name: string,
            clientId: string,
        };
        
        try {
            const id = generateId(15);
            const newProduct = await prisma.product.create({
                data: {
                    id,
                    name,
                    client: {
                        connect: {
                            id: clientId, // replace with the client's id
                        },
                    },
                    versions: {
                        create: [
                            { version: '1.0' },
                            // add more versions here
                        ],
                    },
                },
            });
            return {
                status: 201,
                body: newProduct
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