<script lang="ts">
	import { enhance } from "$app/forms";
	import Signup from "$lib/Signup.svelte";
	const title = "Create your account"
	const authData  = {
      authMethod: "username",
      password: "password"
    };
	const ApiPath = "/signup";
</script>

<Signup />