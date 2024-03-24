<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/navbar.svelte";
    let navIteams = [
        {name: "Home", href: "/"},
        {name: "article", href: "/article"},
    ];
    export let data = {};

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
import { ModeWatcher } from "mode-watcher";
	import Container from "$lib/container.svelte";

</script>

<ModeWatcher />
<Navbar {navIteams} {data} />

<!-- <button on:click={allowNotifications}>new notification</button> -->

<slot></slot>