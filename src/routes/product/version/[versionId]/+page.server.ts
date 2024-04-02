import type { PageServerLoad } from "./$types";
import { Prisma } from '$lib/server/prisma';
import { fail, error, type Actions } from '@sveltejs/kit';
import { writeFileSync, unlink } from 'fs';
import { generateId } from 'lucia';

export const load: PageServerLoad = async ({ params }) => {
    const getVersion = async () => {
        const version = await Prisma.version.findUnique({
            where: {
                id: params.versionId
            },
        });
        if (!version) {
            throw error(404, 'Article not found');
        }
        return version;
    }
    return {
        client: await getVersion(),
    }
}

export const actions: Actions = {
    updateVersion: async ({ request, params }) => {
        const { note, state, atachement, startDate, deadline } = Object.fromEntries(await request.formData()) as {
            note: string,
            state: string,
            startDate: string,
            deadline: string,
            atachement: File,
        };
        try {
            let atachementName;
            let oldVersion;
            if (atachement) {
                atachementName = generateId(15);
                try {
                    writeFileSync(`static/uploads/${atachementName}`,
                    Buffer.from(await atachement.arrayBuffer()));
                } catch (error) {
                    console.log(error);
                    return fail(500, { message: 'Failed to upload file' });
                }
                oldVersion = await Prisma.version.findUnique({
                    where: {
                        id: params.versionId
                    },
                    select: {
                        atachement: true
                    }
                });
            }
            const version = await Prisma.version.update({
                where: {
                    id: params.versionId
                },
                data: {
                    note,
                    state,
                    atachement : atachementName,
                    startDate,
                    deadline
                }
            });
            if (oldVersion && oldVersion.atachement) {
                unlink(`static/uploads/${oldVersion.atachement}`, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${err}`);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
            }
            return {
                status: 200
            };
        }
        catch (err) {
            console.log(err);
            return error(500, 'Failed to update version');
        }
    },
    deleteVersion: async ({ params }) => {
        try {
            await Prisma.version.delete({
                where: {
                    id: params.versionId
                }
            });
            return {
                status: 204
            };
        }
        catch (err) {
            console.log(err);
            return error(500, 'Failed to delete version');
        }
    }
}