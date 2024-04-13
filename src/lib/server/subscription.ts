import webpush, { type PushSubscription } from 'web-push';
// import { VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } from '$env/static/private';
import { Prisma as prisma } from '$lib/server/prisma';



const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

initWebPush();

function initWebPush() {
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
        console.error('VAPID keys are not set');
        return;
    }
	webpush.setVapidDetails('mailto:merry.blueshine@gmail.com', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

async function sendNotification(subscription: PushSubscription, payload: string) {
	try {
		const res = await webpush.sendNotification(subscription, payload);
		return {
			ok: res.statusCode === 201,
			status: res.statusCode,
			body: res.body
		};
	} catch (err) {
		const msg = `Could not send notification: ${err}`;
		console.error(msg);
		return {
			ok: false,
			status: undefined,
			body: msg
		};
	}
}

export async function addUserDevice(userId: string, subscription: PushSubscription) {
    try {
        let user = await prisma.authUser.update({
            where: {
                id: userId
            },
            data: {
                userSubs: JSON.stringify(subscription),
            }
        });
        console.log(`Added user device for user ${user.name}`);
    }
    catch (err) {
        console.error(`Could not add user device: ${err}`);
    }
}

export async function sendNotificationToUser(userId: string, payload: string) {
    try {
        const user = await prisma.authUser.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            console.error(`User with id ${userId} not found`);
            return;
        }

        if (!user.userSubs) {
            console.error(`User with id ${userId} has no subscription`);
            return;
        }
        const subscription = JSON.parse(user.userSubs);
        await sendNotification(subscription, payload);
        console.log(`Sending notification to user ${user.name}`);
    }
    catch (err) {
        console.error(`Could not send notification to user: ${err}`);
    }
}

export async function sendNotificationToAllUsers(payload: string) {
    const users = await prisma.authUser.findMany();

    for (const user of users) {
        if (!user.userSubs) {
            continue;
        }

        const subscription = JSON.parse(user.userSubs);
        await sendNotification(subscription, payload);
    }
}
