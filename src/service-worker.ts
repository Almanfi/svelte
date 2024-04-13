/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const CACHE = `cache${version}`;
const ASSETS = [... build, ... files];

self.addEventListener('install', (event) => {
    try {

        
        async function preCache() {
            const cache = await caches.open(CACHE);
            await cache.addAll(ASSETS);
        }
        event.waitUntil(preCache());
    }
    catch(err){
        console.error(err)
    }
});

self.addEventListener('activate', (event) => {
    try {

        async function clearCache() {
            const keys = await caches.keys();
            for (const key of keys) {
                if (key !== CACHE) await caches.delete(key);
            }
        }
        event.waitUntil(clearCache());
    }
    catch(err){
        console.error(err)
    }
});

self.addEventListener('fetch', function () {
	return;
});

// self.addEventListener('fetch', (event) => {
//     try{

//         if (event.request.method !== 'GET') return;
        
//         async function respond() {
//             const url = new URL(event.request.url);
//             const cache = await caches.open(CACHE);
            
//             if (ASSETS.includes(url.pathname)) {
//                 const cachedResponse = await cache.match(url.pathname);
//             if (cachedResponse) return cachedResponse;
//         }
        
//         try {
//             const response = await fetch(event.request);
//             const isNotExtension = url.protocol === 'http:' || url.protocol === 'https:';
//             const isSuccessful = response.status === 200;
            
//             if (isNotExtension && isSuccessful) {
//                 cache.put(event.request, response.clone());
//             }
//             return response;
//         }
//         catch {
//             const cachedResponse = await cache.match(url.pathname);
//             if (cachedResponse) return cachedResponse;
//         }
//         return new Response('Not found', { status: 404 });
//     }
//     event.respondWith(respond());
//     }
//     catch(err){
//         console.error(err)
//     }
// });

self.addEventListener('push', function (event: any) {
	const payload = event.data?.text() ?? 'no payload';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const registration = (self as any).registration as ServiceWorkerRegistration;
	event.waitUntil(
		registration.showNotification('SvelteKit notification', {
			body: payload
		})
	);
} as EventListener);