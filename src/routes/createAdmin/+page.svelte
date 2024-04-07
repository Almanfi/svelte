<script lang="ts">
	import { enhance } from "$app/forms";
	import Login from "$lib/Login.svelte";
	const title = "Admin Account";
	const authData  = {
      authMethod: "username",
      password: "password"
    };
	const ApiPath = "/createAdmin";
</script>

<div class="flex justify-center mt-7 text-lg font-medium mb-0">
	<h1>{title}</h1>
</div>
<Login signupApi={ApiPath} />

