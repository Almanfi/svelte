/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

    let user = event.locals.user;
    
    return {
            title: 'User Page',
            name: user.username,
    };
};