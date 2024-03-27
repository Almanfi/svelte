<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import { clients } from "$lib/store";

    // export let clients : [{
    //     id: string;
    //     name: string;
    //     email: string;
    //     products: any;
    // }];

</script>

<Table.Root>
    <Table.Caption>A list of available clients.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">Name</Table.Head>
        <Table.Head>email</Table.Head>
        <Table.Head>product</Table.Head>
        <Table.Head class="text-right">id</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each $clients as client (client.id)}
        <Table.Row>
          <Table.Cell class="font-medium">{client.name}</Table.Cell>
          <Table.Cell>{client.email}</Table.Cell>
          {#if client.products}
          <Table.Cell>{Object.keys(client.products).length}</Table.Cell>
          {:else}
          <Table.Cell>0</Table.Cell>
          {/if}
          <Table.Cell class="text-right"> <a href="/client/{client.id}">{client.id}</a></Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>