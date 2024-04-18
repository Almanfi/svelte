<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import { formattedDate } from "$lib/utils";
    import { Loader, X, Check, Sparkles } from 'lucide-svelte';
    export let products: [{
        id: string;
        name: string;
        versions: any;
        client: any;
    }];
    function findStatus(product) {
      return product.versions[product.versions.length - 1].state;
    }

</script>

<div class="rounded-md border m-auto h-full">
  <Table.Root >
    <Table.Header>
      <Table.Row>
        <Table.Head>
          <div class="pl-4">name</div>
        </Table.Head>
        <Table.Head class="text-center">version</Table.Head>
        <Table.Head class="text-center">status</Table.Head>
        {#if products[0].client}
        <Table.Head class="text-center hidden sm:table-cell">client</Table.Head>
        {/if}
        <Table.Head class="text-center hidden sm:table-cell">start Date</Table.Head>
        <Table.Head class="text-center hidden sm:table-cell">deadline</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each products as product (product.id)}
      <Table.Row>
        <a href="/product/{product.id}">
          <Table.Cell class="whitespace-nowrap">
            <div class="pl-4">{product.name}</div>
          </Table.Cell>
        </a>
        {#if product.versions}
        <Table.Cell class="text-center">{product.versions[product.versions.length - 1].version}</Table.Cell>
        {:else}
        <Table.Cell class="text-center">0</Table.Cell>
        {/if}
        <Table.Cell class="text-center">
          {#if findStatus(product) === 'in progress'}
          <Loader class="m-auto w-6 h-6 text-blue-500" />
          {:else if findStatus(product) === 'done'}
          <Check class="m-auto w-6 h-6 text-green-500" />
          {:else if findStatus(product) === 'pending'}
          <Sparkles class="m-auto w-6 h-6 text-yellow-500" />
          {:else}
          <X class="m-auto w-6 h-6 text-red-500" />
          {/if}
        </Table.Cell>
        <!-- <Table.Cell class="text-center">{findStatus(product)}</Table.Cell> -->
        {#if product.client}
        <Table.Cell class="text-center hidden sm:table-cell">{product.client.name}</Table.Cell>
        {/if}
        <Table.Cell class="text-center hidden sm:table-cell">{formattedDate(product.versions[product.versions.length - 1].startDate)}</Table.Cell>
        <Table.Cell class="text-center hidden sm:table-cell">{formattedDate(product.versions[product.versions.length - 1].deadline)}</Table.Cell>
      </Table.Row>
    {/each}
    </Table.Body>
  </Table.Root>
</div>
