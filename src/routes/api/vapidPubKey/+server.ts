// import { VAPID_PUBLIC_KEY } from '$env/static/private'
import { json, type RequestHandler } from '@sveltejs/kit'

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;

export const GET : RequestHandler = async () => {
    return json({ data: VAPID_PUBLIC_KEY })
}