import type { Actions, PageServerLoad } from "./$types"
import { fail } from '@sveltejs/kit';
import { Prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/lucia';
import { generateId } from 'lucia';
import { writeFileSync } from 'fs';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) redirect(302, "/login");
    return {
        username : event.locals.user.username,
        clients : await Prisma.client.findMany()
    }
};


export const actions: Actions = {
    createVersion: async ( event ) => {
        const { productId, startDate, deadline, atachement } = Object.fromEntries(await event.request.formData()) as {
            productId: string,
            note: string,
            startDate: string,
            deadline: string,
            atachement: File,
        };
        try {
            const atachementName = generateId(15);
            try {
            writeFileSync(`static/uploads/${atachementName}`,
                            Buffer.from(await atachement.arrayBuffer()));
            } catch (error) {
                console.log(error);
                return fail(500, { message: 'Failed to upload file' });
            }
            if (!productId) {
                console.log("------productId is undefined------");
                return fail(400, { message: 'Missing productId' });
            }
            const product = await prisma.product.findUnique({
                where: {
                    id: productId,
                },
                include: {
                    versions: true,
                }
            });
            if (!product)
                throw ('can not find product')
            let newVersionNum = 1;
            if (product?.versions) {
                for (let i = 0; i < product.versions.length; i++) {
                    if (product.versions[i].version >= newVersionNum)
                        newVersionNum = product.versions[i].version + 1;
                }
            }
            const id = generateId(15);
            const newversion = await Prisma.version.create({
                data: {
                    id,
                    note: 'new version just created',
                    version: newVersionNum,
                    startDate: startDate,
                    deadline: deadline,
                    atachement: atachementName,
                    product: {
                        connect: {
                            id: productId,
                        },
                    },
                },
            });
            return {
                status: 201,
                body: newversion
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to create client' });
        }
    },
    deleteVersion: async ( event ) => {
        const id = event.url.searchParams.get("id");
        if (!id) {
            return fail(400, { message: 'Missing id' });
        }
        let version = await Prisma.version.findUnique({
            where: {
                id: id
            }
        });
        if (!version) {
            return fail(500, { message: 'version not found' });
        }
        try {
            await Prisma.version.delete({
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
            return fail(500, { message: 'Failed to delete version' });
        }
    }
};