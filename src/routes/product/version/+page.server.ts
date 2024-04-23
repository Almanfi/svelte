import type { Actions, PageServerLoad } from "./$types"
import { fail } from '@sveltejs/kit';
import { Prisma as prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/lucia';
import { generateId } from 'lucia';
import { writeFileSync, unlink } from 'fs';
import { sendNotificationToAllUsers } from '$lib/server/subscription';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) redirect(302, "/login");
    return {
        username : event.locals.user.username,
        clients : await prisma.client.findMany()
    }
};


export const actions: Actions = {
    createVersion: async ( event ) => {
        const formData: {
            [k: string]: FormDataEntryValue | undefined;
        } = Object.fromEntries(await event.request.formData());
        for (const key in formData) {
            if (formData[key] === "") {
                formData[key] = undefined;
            }
        }
        let { note, state, productId, startDate, deadline, atachement } = formData as {
            note: string | undefined,
            state: string | undefined,
            productId: string | undefined,
            startDate: string | undefined,
            deadline: string | undefined,
            atachement: File,
        };
        if (!note) note = 'new version just created';
        try {
            let atachementName;
            if (atachement?.size > 0) {
                atachementName = generateId(15);
                try {
                writeFileSync(`static/uploads/${atachementName}`,
                                Buffer.from(await atachement.arrayBuffer()));
                } catch (error) {
                    console.log(error);
                    return fail(500, { message: 'Failed to upload file' });
                }

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
            const newversion = await prisma.version.create({
                data: {
                    id,
                    note,
                    state,
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
            sendNotificationToAllUsers(`product ${product.name} version ${newversion.version} created`);
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
        let version = await prisma.version.findUnique({
            where: {
                id: id
            }
        });
        if (!version) {
            return fail(500, { message: 'version not found' });
        }
        try {
            await prisma.version.delete({
                where: {
                    id: id
                }
            });
            if (version && version.atachement) {
                unlink(`static/uploads/${version.atachement}`, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${err}`);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
            }
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