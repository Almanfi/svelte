<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import { formattedDate } from "$lib/utils";
    import { Loader, X, Check, Sparkles, CheckCheck, OctagonAlert, FileText, Ban, Timer } from 'lucide-svelte';
    export let products: [{
        id: string;
        name: string;
        versions: any;
        client: any;
    }] = [];
    function findStatus(product) {
      return product.versions[product.versions.length - 1].state;
    }

    import {focusedProductId} from '$lib/store';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleClick() {
      dispatch('click');
    }

</script>
<div on:click={handleClick} on:keyup={() => {}} role="link" tabindex="0">
<div class="rounded-md border m-auto h-full bg-card text-card-foreground shadow">
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>
          <div class="pl-4">name</div>
        </Table.Head>
        <Table.Head class="text-center">version</Table.Head>
        <Table.Head class="text-center">status</Table.Head>
        {#if products && products[0]?.client}
        <Table.Head class="text-center hidden sm:table-cell">client</Table.Head>
        {/if}
        <Table.Head class="text-center hidden sm:table-cell">start Date</Table.Head>
        <Table.Head class="text-center hidden sm:table-cell">deadline</Table.Head>
        <Table.Head class="text-center sm:hidden table-cell">
          <Timer class="m-auto w-4 h-6 font-bold" />
        </Table.Head>
        <Table.Head class="text-center  sm:table-cell">file</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#if products.length === 0}
      <Table.Row on:click={() => {$focusedProductId = null}}>
        <Table.Cell class="text-center" colspan="7">No products</Table.Cell>
      </Table.Row>
      {/if}
      {#each products as product (product.id)}
      <Table.Row on:click={() => {$focusedProductId = product.id}}>
        <Table.Cell class="relative">
          <a href="/product/{product.id}" class="absolute inset-0 flex items-center p-2">
            <div class="pl-4">{product.name}</div>
          </a>
        </Table.Cell>
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
          {:else if findStatus(product) === 'valid'}
          <CheckCheck class="m-auto w-6 h-6 text-emerald-500" />
          {:else if findStatus(product) === 'not valid'}
          <OctagonAlert class="m-auto w-6 h-6 text-red-700" />
          {:else}
          <X class="m-auto w-6 h-6 text-red-500" />
          {/if}
        </Table.Cell>
        <!-- <Table.Cell class="text-center">{findStatus(product)}</Table.Cell> -->
        {#if product.client}
        <Table.Cell class="text-center hidden sm:table-cell">{product.client.name}</Table.Cell>
        {/if}
        <Table.Cell class="text-center hidden sm:table-cell">{formattedDate(product.versions[product.versions.length - 1].startDate)}</Table.Cell>
        <Table.Cell class="text-center">{formattedDate(product.versions[product.versions.length - 1].deadline)}</Table.Cell>
        <Table.Cell class="text-center  sm:table-cell">
        {#if product.versions[product.versions.length - 1].atachement}
          <a href="/files/{product.versions[product.versions.length - 1].atachementt}">
            <FileText class="m-auto text-green-500"/>
          </a>
          {:else}
          <Ban class="m-auto text-red-500"/>
          {/if}
        </Table.Cell>
      </Table.Row>
    {/each}
    </Table.Body>
  </Table.Root>
</div>
</div>
