<script lang="ts">
	import { enhance } from '$app/forms';
	import Login from '$lib/Login.svelte';
  import TableDate from '$lib/data-table/data-table.svelte';

	function handleOnSubmit() {
		console.log("I'm the handleOnSubmit() in App.svelte");
	}
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import DarkMode from '$lib/darkMode.svelte';
	import Container from '$lib/container.svelte';
</script>

<main>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <TableDate />
  </div>
</main>
