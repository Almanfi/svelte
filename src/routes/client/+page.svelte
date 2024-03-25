	<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  
  export let data: PageData;
  console.log(data);
</script>


<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 max-w-screen-sm">
 <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
 
<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    add Client
  </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <form action="/client?/createClient" method="post" use:enhance>
      <Dialog.Header>
        <Dialog.Title>add client</Dialog.Title>
        <Dialog.Description>
          add new client here. Click save when you're done.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input name="name" id="name" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="email" class="text-right">Email</Label>
        <Input name="email" id="email" class="col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <Button type="submit">Save changes</Button>
    </Dialog.Footer>
  </form>
  </Dialog.Content>
</Dialog.Root>




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
    {#each data.clients as client (client.id)}
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

</div>
</div>