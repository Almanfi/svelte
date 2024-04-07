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
  <div class="border border-forground rounded-lg w-[90%] text-center mx-auto my-4 max-w-md">
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">id</Table.Head>
      <Table.Head class="w-full text-center">name</Table.Head>
      <Table.Head class="w-[100px]">version</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each products as product (product.id)}
      <Table.Row>
        <a href="/product/{product.id}">
          <Table.Cell class="font-medium">{product.id}</Table.Cell>
        </a>
        <Table.Cell>{product.name}</Table.Cell>
        {#if product.versions}
        <Table.Cell>{product.versions[product.versions.length - 1].version}</Table.Cell>
        {:else}
        <Table.Cell>0</Table.Cell>
        {/if}
      </Table.Row>
    {/each}
  </Table.Body>
  </div>
</Table.Root>