<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    export let products: [{
        id: string;
        name: string;
        versions: any;
    }];

</script>

<Table.Root>
  <Table.Caption>A list of available clients.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">id</Table.Head>
      <Table.Head>name</Table.Head>
      <Table.Head>version</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each products as product (product.id)}
      <Table.Row>
        <Table.Cell class="font-medium">{product.id}</Table.Cell>
        <Table.Cell>{product.name}</Table.Cell>
        {#if product.versions}
        <Table.Cell>{product.versions[0].version}</Table.Cell>
        {:else}
        <Table.Cell>0</Table.Cell>
        {/if}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>