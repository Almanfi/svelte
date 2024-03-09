<script>
    import Login from '$lib/Login.svelte';

    function handleOnSubmit() {
        console.log("I'm the handleOnSubmit() in App.svelte")
    }
</script>

<main>
    <Login on:submit={handleOnSubmit}/>


</main>
