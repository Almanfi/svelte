import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async (event) => {
    let user = event.locals.user;
    return {
            title: 'User Page',
            name: user.username,
    };
};