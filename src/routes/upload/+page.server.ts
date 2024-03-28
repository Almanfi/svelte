import { writeFileSync } from 'fs';
import type { Actions } from "./$types";
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const fileName = formData.fileName;
        if (
            !(formData.fileToUpload as File).name ||
            (formData.fileToUpload as File).name === 'undefined'
        ) {
            return fail(400, {
                error: true,
                message: 'You must provide a file to upload'
            });
        }
        const { fileToUpload } = formData as { fileToUpload: File };
        writeFileSync(`static/uploads/${fileName}`, Buffer.from(await fileToUpload.arrayBuffer()));
        return {
          success: true
        };
    }
};

