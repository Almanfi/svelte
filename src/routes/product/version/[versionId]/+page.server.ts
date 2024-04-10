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
        const formData: {
            [k: string]: FormDataEntryValue | undefined;
        } = Object.fromEntries(await request.formData());
        for (const key in formData) {
            if (formData[key] === "") {
                formData[key] = undefined;
            }
        }
        let { note, state, atachement, startDate, deadline } = formData as {
            note: string | undefined,
            state: string | undefined,
            startDate: string | undefined,
            deadline: string | undefined,
            atachement: File,
        };

        try {

            let atachementName;
            let oldVersion;
            if (atachement?.size > 0) {
                console.log("-------- creating ataachment ------------");
                atachementName = generateId(15);
                try {
                    writeFileSync(`static/uploads/${atachementName}`,
                    Buffer.from(await atachement.arrayBuffer()));
                } catch (error) {
                    console.log(error);
                    return fail(500, { message: 'Failed to upload file' });
                }
                console.log("-------- geting old version ------------");
                
                oldVersion = await Prisma.version.findUnique({
                    where: {
                        id: params.versionId
                    },
                    select: {
                        atachement: true
                    }
                });
                console.log("-------- done geting old version ------------");
            }
            console.log("-------- updating ------------");
            
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
            console.log("-------- done updating ------------");
            if (oldVersion && oldVersion.atachement) {
                console.log("-------- start deleting old file ------------");
                unlink(`static/uploads/${oldVersion.atachement}`, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${err}`);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
                console.log("-------- done deleting old file ------------");
            }
            return {
                status: 200,
                body: version,
            };
        }
        catch (err) {
            console.log(err);
            return error(500, 'Failed to update version');
        }
    },
    deleteVersion: async ({ params }) => {
        try {
            const version = await Prisma.version.delete({
                where: {
                    id: params.versionId
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
        catch (err) {
            console.log(err);
            return error(500, 'Failed to delete version');
        }
    }
}