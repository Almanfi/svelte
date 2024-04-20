import type { Actions, PageServerLoad } from "./$types"
import { fail } from '@sveltejs/kit';
import { Prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/lucia';
import { generateId } from 'lucia';
import { sendNotificationToAllUsers } from '$lib/server/subscription';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) redirect(302, "/login");
    return {
        username : event.locals.user.username,
        clients : await Prisma.client.findMany({
            include: {
                products: true
            }
        })
    }
};


export const actions: Actions = {
    createClient: async ( event ) => {
        let  { name, email } = Object.fromEntries(await event.request.formData()) as {
            name: string,
            email: string,
        };
        name = name.trim();
        email = email.trim();
        if (email === '' || name === ''){
            return fail(400, { message: 'form data is incorrect' });
        }
        
        try {
            const id = generateId(15);
            const client = await Prisma.client.create({
                data: {
                    id,
                    name,
                    email,
                }
            });
            sendNotificationToAllUsers(`new client added: ${client.name}`);
            return {
                status: 201,
                body: client
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to create client' });
        }
    },
    deleteClient: async ( event ) => {
        const id = event.url.searchParams.get("id");
        if (!id) {
            return fail(400, { message: 'Missing id' });
        }
        let client = await Prisma.client.findUnique({
            where: {
                id
            }
        });
        if (!client) {
            return fail(500, { message: 'Client not found' });
        }
        // let userId = event.locals.user.id;
        // if (client.userId !== userId) {
        //     return fail(403, { message: 'Unauthorized' });
        // }
        try {
            await Prisma.client.delete({
                where: {
                    id
                }
            });
            return {
                status: 204
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to delete client' });
        }
    }
};