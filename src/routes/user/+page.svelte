<script lang="ts">
    import { onMount } from 'svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    
    export let data;

    let notifPermGranted: boolean | null = null;
    let isSubscribed = false;
    onMount(async () => {
        notifPermGranted = Notification.permission === "granted";
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
        if (!("serviceWorker" in navigator)) {
            return false;
        }
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        console.log(subscription);
        return subscription !== null;
    }

    async function subscribeUser() {
        if (!("serviceWorker" in navigator)) {
            return;
        }
        try {

            const res = await fetch("/api/vapidPubKey");
            const { data } = await res.json();
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: data,
            });
            isSubscribed = true;
            console.log(JSON.stringify(subscription));
            sendSubscriptionToServer(subscription);
        } catch (error) {
            console.error("Error subscribing to push", error);
        }
    }

    function randomNotification() {
        const notifTitle = "notification 2";
        const notifBody = `Created by notif creator}.`;
        const notifImg = `pwa-64x64.png`;
        const options = {
            body: notifBody,
            icon: notifImg,
        };
        new Notification(notifTitle, options);
        setTimeout(randomNotification, 10000);
}

    function allowNotifications() {
        Notification.requestPermission().then((result) => {
        if (result === "granted") {
        randomNotification();
        }
      });
    };

</script>

<h1>{data.title}</h1>
<p>{data.name}</p>
<div class="flex flex-col items-center">
    <img src="pwa-64x64.png" alt="pwa logo" class="m-3"/>
    <Button on:click={allowNotifications}>Allow Notifications</Button>
    <div class="m-3">this session is subscribed = {isSubscribed}</div>
    <Button on:click={unsubscribe}>unsubscribe</Button>
</div>