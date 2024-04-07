<script lang="ts">
    import type { PageData } from './$types'; 
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import CaretSort from "svelte-radix/CaretSort.svelte";
    import * as Command from "$lib/components/ui/command";
    import * as Popover from "$lib/components/ui/popover";
    import { tick } from "svelte";

    export { className as class };
    
    let foundClients: {
        id: string; name: string; email: string }[] = []
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
        fetchingClients = true;
        console.log("fetching clients: " + query);
        return await fetch(`/api/client?q=${query}`)
        .then(response => response.json())
        .then(value => {
          console.log(value);
          if (value?.length) {
            foundClients = value
            console.log("found client was updated");
          }
          fetchingClients = false;
        })
        .catch(error => {console.error('Error:', error); fetchingClients = false;});
    }

    $: if (open) {
        fetchClients(inputValue)
    }
</script>

<Popover.Root bind:open let:ids >
    <Popover.Trigger asChild let:builder >
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-[200px] justify-between"
      >
        {selectedValue}
        <CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-[200px] p-0">
      <Command.Root>
        <Command.Input placeholder="Search clients..." class="h-9" bind:value={inputValue}/>
        {#if fetchingClients}
        <Command.Loading>Loading...</Command.Loading>
        {:else}
        <Command.Empty>No client found.</Command.Empty>
        <Command.Group>
          {#each foundClients as foundClient}
            <Command.Item
              value={foundClient.id + " " + foundClient.name + " " + foundClient.email}
              onSelect={(currentValue) => {
                value = currentValue;
                closeAndFocusTrigger(ids.trigger);
              }}
            >
              <div class="flex flex-col items-start justify-center w-full">
                <div class="text-xs text-gray-500">{foundClient.name}</div>
                <div class="flex flex-wrap justify-end w-full">
                    <div class="text-xs text-gray-500">{foundClient.email}</div>
                </div>
              </div>
            </Command.Item>
          {/each}
        </Command.Group>
        {/if}
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
