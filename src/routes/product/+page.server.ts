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
        products : await Prisma.product.findMany({
            include: {
                versions: true
            },
    })
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
            const versionId = generateId(15);
            const newProduct = await Prisma.product.create({
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
                            {
                                id: versionId,
                                version: 1,
                                note: 'new product just created'
                            },
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
    deleteProduct: async ( event ) => {
        const id = event.url.searchParams.get("id");
        if (!id) {
            return fail(400, { message: 'Missing id' });
        }
        let product = await Prisma.product.findUnique({
            where: {
                id: id
            }
        });
        if (!product) {
            return fail(500, { message: 'product not found' });
        }
        try {
            await Prisma.product.delete({
                where: {
                    id: id
                }
            });
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