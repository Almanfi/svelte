<script>
	import { enhance } from '$app/forms';
    import Login from '$lib/Login.svelte';

    function handleOnSubmit() {
        console.log("I'm the handleOnSubmit() in App.svelte")
    }
</script>

<main>
    <Login on:submit={handleOnSubmit}/>



    <form method="post" action="/?/logout" use:enhance>
        <button>Sign out</button>
    </form>

</main>
