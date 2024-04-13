<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/navbar.svelte";
    let navIteams = [
        {name: "Home", href: "/"},
        {name: "article", href: "/article"},
    ];
    export let data = {};

    import { ModeWatcher } from "mode-watcher";
    import { DashboardHeader } from '$lib/dashboard';
    import { Toaster } from "$lib/components/ui/sonner";

</script>


<ModeWatcher />
<Toaster />
<DashboardHeader {data}/>

<slot></slot>