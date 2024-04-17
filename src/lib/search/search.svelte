<script lang="ts">
    import type { PageData } from './$types'; 
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import CaretSort from "svelte-radix/CaretSort.svelte";
    import * as Command from "$lib/components/ui/command";
    import * as Popover from "$lib/components/ui/popover";
    import { tick } from "svelte";
    import { Archive } from 'lucide-svelte';
    import { SquareUser } from 'lucide-svelte';

    export { className as class };
    
    let foundClients: {
        id: string; name: string; email: string }[] = []
    let foundProducts: {
        id: string; name: string; client: {name: string} }[] = []
    let open = false;
    export let value = "";
    let fetchingClients = false;
    
    $: selectedValue =
        foundClients.find((f) => value.includes(f.id))?.name ?? "Select a client...";
    
    // We want to refocus the trigger button when the user selects
    // an item from the list so users can continue navigating the
    // rest of the form with the keyboard.
    function closeAndFocusTrigger(triggerId: string) {
        open = false;
        tick().then(() => {
        document.getElementById(triggerId)?.focus();
        });
    }
    let inputValue = '';

    async function fetchClients(query: string) {
        console.log("fetching clients: " + query);
        return await fetch(`/api/client?q=${query}&c=5`)
        .then(response => response.json())
        .then(value => {
          console.log(value);
          if (value?.length) {
            foundClients = value
            console.log("found client was updated");
          }
        })
        .catch(error => {console.error('Error:', error); fetchingClients = false;});
    }
    async function fetchProducts(query: string) {
        console.log("fetching clients: " + query);
        return await fetch(`/api/product?q=${query}&c=5`)
        .then(response => response.json())
        .then(value => {
          console.log(value);
          if (value?.length) {
            foundProducts = value
            console.log("found product was updated");
          }
        })
        .catch(error => {console.error('Error:', error); fetchingClients = false;});
    }

    async function fetchClientsAndProducts(query: string) {
        fetchingClients = true;
        fetchClients(inputValue);
        fetchProducts(inputValue);
        fetchingClients = false;
    }

    $: if (open) {
        // fetchClients(inputValue)
        fetchClientsAndProducts(inputValue)
    }
</script>

<Popover.Root bind:open let:ids >
    <Popover.Trigger asChild let:builder >
        <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-full justify-between sm:w-[300px]"
      >
        Search...
      </Button>
    </Popover.Trigger>
    <Popover.Content class="p-0 w-[90%] ml-[2.5%] sm:w-[300px] sm:ml-auto">
      <Command.Root>
        <Command.Input placeholder="Search clients..." class="h-9" bind:value={inputValue}/>
        {#if fetchingClients}
        <Command.Loading>Loading...</Command.Loading>
        {:else}
        <Command.Empty>No client found.</Command.Empty>
        <Command.Group>
          {#each foundProducts as foundProduct}
          <a href="/product/{foundProduct.id}">
            <Command.Item
            value={foundProduct.id + " " + foundProduct.name + " " + foundProduct.client.name}
            >
            <!-- onSelect={(currentValue) => {
                value = currentValue;
                closeAndFocusTrigger(ids.trigger);
              }} -->
            <div class="flex flex-col items-start justify-center w-full">
              
                <div class="text-xs text-gray-500">
                  <Archive class="inline mx-2"/>
                  {foundProduct.name}
                </div>
                <div class="flex flex-wrap justify-end w-full">
                  <div class="text-xs text-gray-500">{foundProduct.client.name}</div>
                </div>
              </div>
            </Command.Item>
          </a>
          {/each}
        </Command.Group>
        <Command.Separator/>
        <Command.Group>
          {#each foundClients as foundClient}
          <a href="/client/{foundClient.id}">
            <Command.Item
              value={foundClient.id + " " + foundClient.name + " " + foundClient.email}
            >
              <div class="flex flex-col items-start justify-center w-full">
                <div class="text-xs text-gray-500">
                  <SquareUser class="inline mx-2"/>
                  {foundClient.name}
                </div>
                <div class="flex flex-wrap justify-end w-full">
                  <div class="text-xs text-gray-500">{foundClient.email}</div>
                </div>
              </div>
            </Command.Item>
          </a>
          {/each}
        </Command.Group>
        {/if}
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
