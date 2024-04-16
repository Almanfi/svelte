import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { Prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) redirect(302, "/login");
    let groups = await Prisma.userGroup.findMany();
    try {
        let ids: string[] = [];
        for (let i = 0; i < 3; i++) {
            ids[i] = generateId(15);
        }
        if (groups.length < 3) {
            let newGroups = [
                { name: "admin", id: ids[0] },
                { name: "sale" , id: ids[1]},
                { name: "production" , id: ids[2]}
            ];
            newGroups = newGroups.filter(group => 
                    groups.filter(g => g.name === group.name).length === 0);
                let grooupCreation = newGroups.map(group => 
                    Prisma.userGroup.create({
                        data: {
                            name: group.name,
                            id: group.id,
                        }
                    })
                );
            let userGroupTransaction = await Prisma.$transaction(grooupCreation);

            // groups = await Prisma.userGroup.createMany({
            //     data: newGroups.map(group => ({
            //         name: group.name,
            //         id: group.id,
            //       })),
            // });
            groups = userGroupTransaction;
        }
    }
    catch (error) {
        console.log(error);
        return fail(500, { message: 'Failed to create user groups' });
    }
    return {
        username : event.locals.user.username,
        groups : groups.filter(group => group.name !== "admin"),
        users : await Prisma.authUser.findMany({
            where: {
                NOT: {
                    userGroup: {
                        some: {
                            name: "admin"
                        }
                    }
                }
            },
            include: {
                userGroup : true
            },
    })
    }
};

export const actions: Actions = {
    updateUser: async ( event ) => {
        const { UserId, groups } = Object.fromEntries(await event.request.formData()) as {
            userId: string,
            groups: string,
        };

        if (!event.locals.user) return fail(401, { message: 'Unauthorized' });
        let authUser = await prisma.authUser.findUnique({
            where: {
                id: event.locals.user.id
            },
            include: {
                userGroup: true
            }
        });
        console.log(authUser);
        if (!authUser || authUser.userGroup.filter(group => group.name === "admin").length === 0)
            return fail(401, { message: 'You do not have permission to update user group' });
        
        if (!UserId) return fail(400, { message: 'User ID is required' });
        if (!groups) return fail(400, { message: 'User group is required' });
        const user = await Prisma.authUser.findUnique({
            where: {
                id: UserId
            },
            include: {
                userGroup: true,
            }
        });
        if (!user) return fail(404, { message: 'User not found' });
        if (user.userGroup.filter(group => group.name === "admin").length > 0)
            return fail(400, { message: 'Cannot update user group for admin' });

        let userGroup = await Prisma.userGroup.findMany({
            where: {
                name: {
                    in: groups.split(","),
                }
            }
        });
        if (userGroup.length === 0)
            return fail(400, { message: 'Invalid user group' });

        try {
            const user = await Prisma.authUser.update({
                where: {
                    id: UserId
                },
                data: {
                    userGroup: {
                        set: userGroup.map(group => ({ id: group.id })),
                    }
                },
                include: {
                    userGroup: true
                }
            });
            return {
                status: 200,
                body: user
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to update user' });
        }
    },
    promoteToAdmin: async ( event, locals ) => {
        const { UserId } = Object.fromEntries(await event.request.formData()) as {
            userId: string,
        };
        
        if (locals.user.userGroup.name !== "admin")
            return fail(401, { message: 'You do not have permission to update user group' });

        if (!UserId) return fail(400, { message: 'User ID is required' });

        let userGroup = await Prisma.userGroup.findFirst({
            where: {
                name: "admin"
            }
        });
        if (!userGroup)
            return fail(500, { message: 'internal server error' });

        try {
            const user = await Prisma.authUser.update({
                where: {
                    id: UserId
                },
                data: {
                    userGroup: {
                        set : {
                            id: userGroup.id
                        }
                    }
                },
                include: {
                    userGroup: true
                }
            });
            return {
                status: 200,
                body: user
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to update user to admin' });
        }
    },
    demoteFromAdmin: async ( event, locals ) => {
        const { UserId } = Object.fromEntries(await event.request.formData()) as {
            userId: string,
        };
        
        if (locals.user.userGroup.name !== "admin")
            return fail(401, { message: 'You do not have permission to update user group' });

        if (locals.user.id === UserId)
            return fail(400, { message: 'Cannot demote yourself' });

        if (!UserId) return fail(400, { message: 'User ID is required' });

        let userGroup = await Prisma.userGroup.findFirst({
            where: {
                name: "admin"
            }
        });
        if (!userGroup)
            return fail(500, { message: 'internal server error' });

        try {
            const user = await Prisma.authUser.update({
                where: {
                    id: UserId
                },
                data: {
                    userGroup: {
                        disconnect : {
                            id: userGroup.id
                        }
                    }
                },
                include: {
                    userGroup: true
                }
            });
            return {
                status: 200,
                body: user
            };
        }
        catch (error) {
            console.log(error);
            return fail(500, { message: 'Failed to update user to admin' });
        }
    },
};