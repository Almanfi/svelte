import type { PageServerLoad } from "./$types";
import { Prisma } from '$lib/server/prisma';
import { error, type Actions } from '@sveltejs/kit';

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
        const { note } = Object.fromEntries(await request.formData()) as {
            note: string,
        };
        try {
            const version = await Prisma.version.update({
                where: {
                    id: params.versionId
                },
                data: {
                   note
                }
            });
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