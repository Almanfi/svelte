<script lang="ts">
	import { Cell } from '$lib/components/ui/range-calendar';
	import * as Table from '$lib/components/ui/table/index.js';
	import TableCell from '$lib/components/ui/table/table-cell.svelte';
	import { clients } from '$lib/store';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Trash2 } from 'lucide-svelte';

	// export let clients : [{
	//     id: string;
	//     name: string;
	//     email: string;
	//     products: any;
	// }];
</script>

<div class="rounded-md border my-4 mx-auto h-full bg-card text-card-foreground shadow">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>
					<div class="pl-4">Name</div>
				</Table.Head>
				<Table.Head class="text-left hidden sm:table-cell">email</Table.Head>
				<Table.Head class="text-center">product</Table.Head>
				<Table.Head class="text-center">delete</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $clients as client (client.id)}
      <Table.Row>
        <Table.Cell class="whitespace-nowrap">
            <a href="/client/{client.id}">
              <div class="pl-4">{client.name}</div>
            </a>
          </Table.Cell>
					<Table.Cell class="hidden sm:table-cell">{client.email}</Table.Cell>
					{#if client.products}
						<Table.Cell class="text-center">{Object.keys(client.products).length}</Table.Cell>
					{:else}
						<Table.Cell class="text-center">0</Table.Cell>
					{/if}
					<Table.Cell class="flex justify-center">
						<form action="?/deleteClient&id={client.id}" method="post">
                <button type="submit" class=" text-red-900">
                  <Trash2 class="m-auto"/>
                </button>
						</form>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
