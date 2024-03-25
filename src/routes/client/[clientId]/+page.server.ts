import type { PageServerLoad } from "./$types";
import { Prisma } from '$lib/server/prisma';
import { error, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const getClient = async () => {
        const client = await Prisma.client.findUnique({
            where: {
                id: params.clientId
            },
            include: {
                products: {
                    include: {
                        versions: true
                    }
                }
            }

        });
        if (!client) {
            throw error(404, 'Article not found');
        }
        return client;
    }
    // const getProducts = async () => {
    //     const products = await Prisma.product.findMany({
    //         where: {
    //             clientId: params.clientId
    //         },
    //         include: {
    //             versions: true
    //         }
    //     });
    //     if (!products) {
    //         throw error(404, 'Products not found');
    //     }
    //     return products;
    // }

    return {
        client: await getClient(),
        // products: await getProducts()
    }
}

export const actions: Actions = {
    updateArticle: async ({ request, params }) => {
        const { title, content } = Object.fromEntries(await request.formData()) as {
            title: string,
            content: string
        };
        try {
            const article = await Prisma.article.update({
                where: {
                    id: Number(params.articleId)
                },
                data: {
                    title,
                    content
                }
            });
            return {
                status: 200
            };
        }
        catch (err) {
            console.log(err);
            return error(500, 'Failed to update article');
        }
    },
    deleteArticle: async ({ params }) => {
        try {
            await Prisma.article.delete({
                where: {
                    id: Number(params.articleId)
                }
            });
            return {
                status: 204
            };
        }
        catch (err) {
            console.log(err);
            return error(500, 'Failed to delete article');
        }
    }
}