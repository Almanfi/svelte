import type { PageServerLoad } from "./$types";
import { Prisma } from '$lib/server/prisma';
import { error, type Actions } from '@sveltejs/kit';
import { sendNotificationToAllUsers } from '$lib/server/subscription';

export const load: PageServerLoad = async ({ params }) => {
    console.log("fetching product..." + params.productId);
    const getProduct = async () => {
        const product = await Prisma.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                versions: true
            }
        });
        if (!product) {
            throw error(404, 'Article not found');
        }
        return product;
    }
    return {
        product: await getProduct(),
    }
}

export const actions: Actions = {
    updateProduct: async ({ request, params }) => {
        const { name } = Object.fromEntries(await request.formData()) as {
            name: string,
        };
        try {
            const product = await Prisma.product.update({
                where: {
                    id: params.productId
                },
                data: {
                    name
                }
            });
            sendNotificationToAllUsers(`product updated: ${product.name}`);
            return {
                status: 200
            };
        }
        catch (err) {
            console.log(err);
            return error(500, 'Failed to update product');
        }
    },
    deleteProduct: async ({ params }) => {
        try {
            await Prisma.product.delete({
                where: {
                    id: params.productId
                }
            });
            return {
                status: 204
            };
        }
        catch (err) {
            console.log(err);
            return error(500, 'Failed to delete product');
        }
    }
}