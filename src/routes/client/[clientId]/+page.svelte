<script lang="ts">
    import type { PageData } from './$types';
    import { enhance } from '$app/forms';
    import * as Breadcrumb from "$lib/components/ui/breadcrumb";
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import { list, root } from 'postcss';
    export let data: PageData

    let client;

    const fetchArticle = async () => {
        if (data && data.client) {
            client = await data.client;
        }
    }

    fetchArticle();

    // console.log(data);
    // console.log(client);
</script>

<Breadcrumb.Root>
    <Breadcrumb.List>
        <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
            <Breadcrumb.Link href="/client">Client</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
        {#if client}
        <Breadcrumb.Link>{client.name}</Breadcrumb.Link>
        {/if}
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>


<Dialog.Root>
<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    add pruduct
</Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
    <form action="/product?/createProduct" method="post" use:enhance>
    <Dialog.Header>
        <Dialog.Title>add product</Dialog.Title>
        <Dialog.Description>
        add new product here. Click save when you're done.
        </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
    <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input name="name" id="name" class="col-span-3" />
    </div>
    {#if client}
    <input type="hidden" name="clientId" bind:value={client.id}>
    {/if}
    </div>
    <Dialog.Footer>
    <Button type="submit">add product</Button>
    </Dialog.Footer>
</form>
</Dialog.Content>
</Dialog.Root>

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
      {#each data.client.products as product (product.id)}
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

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">editing article</h2>
        </div>

        {#if client}
        
        <form class="space-y-6" action="?/updateArticle" method="POST">
            <div>
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900">title</label>
            <div class="mt-2">
                <input id="title" name="title" type="text" value={client.name} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
            </div>
        
            <div>
            <div class="flex items-center justify-between">
                <label for="content" class="block text-sm font-medium leading-6 text-gray-900">content</label>
            </div>
            <div class="mt-2">
                <input id="content" name="content" type="text" value={client.email} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
            </div>
        
            <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">update info</button>
            </div>
        </form>

        {/if}
  
  </div>
  </div>