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


<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 max-w-screen-sm">
 <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

<ClientAdder />
<ClientTable />

</div>
</div>