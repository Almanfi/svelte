import type { PageServerLoad } from "./$types";
import { Prisma } from '$lib/server/prisma';
import { error, type Actions } from '@sveltejs/kit';
import { sendNotificationToAllUsers } from '$lib/server/subscription';

export const load: PageServerLoad = async ({ params }) => {
    const getClient = async () => {
        const client = await Prisma.client.findUnique({
            where: {
                id: params.clientId
            },
            include: {
                products: {
                    include: {
                        versions: true,
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
    updateClient: async ({ request, params }) => {
        const { name, email } = Object.fromEntries(await request.formData()) as {
            name: string,
            email: string
        };
        try {
            const client = await Prisma.client.update({
                where: {
                    id: params.clientId
                },
                data: {
                    name,
                    email
                }
            });
            sendNotificationToAllUsers(`client updated: ${client.name}`);
            return {
                status: 200
            };
        }
        catch (err) {
            console.log(err);
            return error(500, 'Failed to update client');
        }
    },
    deleteClient: async ({ params }) => {
        try {
            await Prisma.client.delete({
                where: {
                    id: params.clientId
                }
            });
            return {
                status: 204
            };
        }
        catch (err) {
            console.log(err);
            return error(500, 'Failed to delete client');
        }
    }
}