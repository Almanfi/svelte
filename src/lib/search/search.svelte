<script lang="ts">
    import type { PageData } from './$types';
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import CaretSort from "svelte-radix/CaretSort.svelte";
    import * as Command from "$lib/components/ui/command";
    import * as Popover from "$lib/components/ui/popover";
    import { onMount, tick } from "svelte";
    import { Archive } from 'lucide-svelte';
    import { SquareUser } from 'lucide-svelte';
    import { Input } from "$lib/components/ui/input";
    import { Search } from 'lucide-svelte';
    import Separator from '$lib/components/ui/separator/separator.svelte';

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
          console.log("clients : ");
          console.log(value);
          // if (value?.length) {
            foundClients = value
            console.log("found client was updated");
          // }
        })
        .catch(error => {console.error('Error:', error); fetchingClients = false;});
    }
    async function fetchProducts(query: string) {
        console.log("fetching clients: " + query);
        return await fetch(`/api/product?q=${query}&c=5`)
        .then(response => response.json())
        .then(value => {
          console.log("products : ");
          console.log(value);
          // if (value?.length) {
            foundProducts = value
            console.log("found product was updated");
          // }
        })
        .catch(error => {console.error('Error:', error); fetchingClients = false;});
    }

    async function fetchClientsAndProducts(query: string) {
        fetchingClients = true;
        
        let fetchC = fetchClients(inputValue);
        let fetchP = fetchProducts(inputValue);
        fetchingClients = false;
        console.log("fetching clients and products: "
                  + JSON.stringify(fetchC) + " " + JSON.stringify(fetchP));
    }

    let pageIsloaded = false;
    onMount(() => {
      pageIsloaded = true;
      fetchClientsAndProducts(inputValue);
    });
    
    // $: console.log("inputValue: " + inputValue);
    $: if (pageIsloaded) {
      fetchClientsAndProducts(inputValue);
    }
    // $: console.log("inputValue: " + inputValue)
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
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
		<div class="flex justify-center items-center">
			<Search class="w-4 h-4 opacity-50 ml-3" />
			<Input
				class="border-opacity-0 focus-visible:ring-0"
				placeholder="Search clients..."
				bind:value={inputValue}
			/>
		</div>
		<Separator />
		<Popover.Close class="w-full">
			<div class="flex flex-col space-y-1 p-1">
				{#if !foundClients.length && !foundProducts.length}
					<div
						class="p-2 rounded-lg flex flex-col items-start justify-center w-full hover:bg-foreground/20"
					>
						<div class="text-xs text-gray-500 text-center">no match found</div>
					</div>
				{/if}

				{#each foundProducts as foundProduct}
					<a href="/product/{foundProduct.id}">
						<div
							class="p-2 rounded-lg flex flex-col items-start justify-center w-full hover:bg-foreground/20"
						>
							<div class="text-xs text-gray-500">
								<Archive class="inline mx-2" />
								{foundProduct.name}
							</div>
							<div class="flex flex-wrap justify-end w-full">
								<div class="text-xs text-gray-500">{foundProduct.client.name}</div>
							</div>
						</div>
					</a>
				{/each}

				{#if foundClients.length && foundProducts.length}
					<Separator />
				{/if}

				{#each foundClients as foundClient}
					<a href="/client/{foundClient.id}">
						<div
							class="p-2 rounded-lg flex flex-col items-start justify-center w-full hover:bg-foreground/20"
						>
							<div class="text-xs text-gray-500">
								<SquareUser class="inline mx-2" />
								{foundClient.name}
							</div>
							<div class="flex flex-wrap justify-end w-full">
								<div class="text-xs text-gray-500">{foundClient.email}</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</Popover.Close>

		<!-- <input type="text" class="w-full border rounded-lg">
            {#each foundClients as client}
        <div>{client.name}</div>
      {/each}
      {#each foundProducts as product}
        <div>{product.name}</div>
      {/each} -->
		<!-- 
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
            onSelect={(currentValue) => {
                value = currentValue;
                closeAndFocusTrigger(ids.trigger);
              }}
            >
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
              onSelect={(currentValue) => {
                value = currentValue;
                closeAndFocusTrigger(ids.trigger);
              }}
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
     <!--  -->
	</Popover.Content>
</Popover.Root>
