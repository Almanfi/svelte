<script lang="ts">
	import { enhance } from "$app/forms";
	import Login from "$lib/Login.svelte";
	const title = "Sign in to your account"
	const authData  = {
      authMethod: "username",
      password: "password"
    };
	const ApiPath = "/login";
</script>

<div class="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
	<Login />
</div>
