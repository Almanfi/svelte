<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Ellipsis } from 'lucide-svelte';

	export let data;

	let notifPermGranted: boolean | null = null;
	let isSubscribed = false;
	onMount(async () => {
		notifPermGranted = Notification.permission === 'granted';
		if (notifPermGranted) {
			isSubscribed = await checkSubscriptionState();
			if (!isSubscribed) {
				await subscribeUser();
			}
		}
	});

	async function sendSubscriptionToServer(subscription: PushSubscription) {
		try {
			const res = await fetch('/api/addSubscription', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ subscription })
			});
			if (!res.ok)
				throw new Error(`Error saving subscription on server: ${res.statusText} (${res.status})`);
		} catch (error) {
			console.error('Error saving subscription on server:', error);
			unsubscribe();
		}
	}

	async function unsubscribe() {
		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.ready;
			const subscription = await registration.pushManager.getSubscription();
			if (subscription) {
				await subscription.unsubscribe();
				isSubscribed = false;
			}
		}
	}

	async function checkSubscriptionState() {
		if (!('serviceWorker' in navigator)) {
			return false;
		}
		const registration = await navigator.serviceWorker.ready;
		const subscription = await registration.pushManager.getSubscription();
		// console.log(subscription);
		return subscription !== null;
	}

	async function subscribeUser() {
		if (!('serviceWorker' in navigator)) {
			return;
		}
		try {
			const res = await fetch('/api/vapidPubKey');
			const { data } = await res.json();
			const registration = await navigator.serviceWorker.ready;
			const subscription = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: data
			});
			isSubscribed = true;
			console.log(JSON.stringify(subscription));
			sendSubscriptionToServer(subscription);
		} catch (error) {
			console.error('Error subscribing to push', error);
		}
	}

	function randomNotification() {
		const notifTitle = 'notification 2';
		const notifBody = `Created by notif creator}.`;
		const notifImg = `pwa-64x64.png`;
		const options = {
			body: notifBody,
			icon: notifImg
		};
		new Notification(notifTitle, options);
		setTimeout(randomNotification, 10000);
	}

	function allowNotifications() {
		Notification.requestPermission().then((result) => {
			if (result === 'granted') {
				randomNotification();
			}
		});
	}
    import InfoUpdator from './infoUpdator.svelte';
    import PassUpdator from './passUpdator.svelte';
</script>

<div class="max-w-[90%] m-auto space-y-4 pt-4">
    <h1 class="text-4xl font-bold mb-4 text-center">User page</h1>
    <div class="flex justify-between">

        <InfoUpdator user={data.user} />
        <PassUpdator />
    </div>
	<div class="flex flex-col items-center justify-center mt-4">
		<div class="h-full w-full grid md:gap-4 gap-2 sm:grid-cols-2 md:grid-cols-2">
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pt-2 pb-0">
					<Card.Title class="text-sm font-medium">Name</Card.Title>
				</Card.Header>
				<Card.Content class="py-2">
					<div class="text-2xl font-bold">{data.user.username}</div>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pt-2 pb-0">
					<Card.Title class="text-sm font-medium">Email</Card.Title>
				</Card.Header>
				<Card.Content class="py-2">
					<div class="text-2xl font-bold">
                        {data.user.email?   data.user.email : 'N/A'}
                    </div>
				</Card.Content>
			</Card.Root>
			<Card.Root class="p-0 sm:hidden">
				<Card.Content class="py-2">
					<div class="text-md font-bold text-center">
						show more
						<Ellipsis class="h-6 w-6 inline" />
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>

<div class="flex flex-col items-center">
    <div class="mt-6 text-2xl font-bold">Notification</div>
	<img src="pwa-64x64.png" alt="pwa logo" class="m-3" />
	<!-- <Button on:click={allowNotifications}>Allow Notifications</Button> -->
    {#if isSubscribed}
        <Button class="bg-blue-800 hover:bg-blue-600" on:click={unsubscribe}>reset</Button>
    {:else}
        <Button class="bg-green-800 hover:bg-green-600"  on:click={allowNotifications}>subscribe</Button>
    {/if}
	<!-- <div class="m-3">this session is subscribed = {isSubscribed}</div> -->
	<!-- <Button on:click={unsubscribe}>unsubscribe</Button> -->
</div>
