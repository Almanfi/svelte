<script lang="ts">
    import { Cell } from "$lib/components/ui/range-calendar";
import * as Table from "$lib/components/ui/table/index.js";
	import TableCell from "$lib/components/ui/table/table-cell.svelte";
    import { clients } from "$lib/store";

    // export let clients : [{
    //     id: string;
    //     name: string;
    //     email: string;
    //     products: any;
    // }];

</script>

<Table.Root class="text-center">
    <Table.Caption>A list of available clients.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="text-center w-fit">Name</Table.Head>
        <Table.Head class="text-center hidden sm:table-cell align-middle">email</Table.Head>
        <Table.Head class="text-center w-10">product</Table.Head>
        <Table.Head class="text-center" colspan="2">change</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each $clients as client (client.id)}
        <Table.Row>
          <Table.Cell class="font-medium">{client.name}</Table.Cell>
          <Table.Cell class="hidden sm:table-cell">{client.email}</Table.Cell>
          {#if client.products}
          <Table.Cell>{Object.keys(client.products).length}</Table.Cell>
          {:else}
          <Table.Cell>0</Table.Cell>
          {/if}
          <!-- <Table.Cell class="text-right"> <a href="/client/{client.id}">{client.id}</a></Table.Cell> -->
          <Table.Cell class="text-right"> <a href="/client/{client.id}">edit</a></Table.Cell>
          <Table.Cell>
            <form action="?/deleteClient&id={client.id}" method="post">
                <button type="submit" >delete</button>
            </form>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>