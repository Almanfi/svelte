<script lang="ts">
  import type { PageData } from './$types';
  import ClientTable from '$lib/client/table.svelte';
  import ClientAdder from '$lib/client/adder.svelte';
  import { clients } from '$lib/store';

  export let data: PageData;
  clients.set(data.clients);
  // let clients = data.clients;
  console.log(data);
</script>


<div class="max-w-[90%] m-auto space-y-4 py-4">
<div class="flex flex-col items-center justify-center mt-4">
	<h1 class="text-4xl font-bold">Clients</h1>
	<div class="mt-4 w-full space-y-3">
		<!-- <div class="flex justify-end w-full"> -->
  <ClientAdder />
  <ClientTable />
 </div>
</div>
</div>