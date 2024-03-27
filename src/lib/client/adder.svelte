<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { enhance, deserialize } from '$app/forms';
    import { clients } from "$lib/store";
    
    let name = '';
    let email = '';

    async function handleSubmit(event) {
    event.preventDefault();

    let form = new FormData(event.target);
    const response = await fetch('/client?/createClient', {
      method: 'post',
      body: form
    });

    const data = deserialize(await response.text()).data.body;
    // Now you can access the response data
    
    // Update the clients store
    $clients = [...$clients, { ...data}];
    }

</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
      add Client
    </Dialog.Trigger>
      <Dialog.Content class="sm:max-w-[425px]">
        <form on:submit={handleSubmit} action="/client?/createClient" method="post" use:enhance>
        <!-- <form action="/client?/createClient" method="post" use:enhance> -->
        <Dialog.Header>
          <Dialog.Title>add client</Dialog.Title>
          <Dialog.Description>
            add new client here. Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input bind:value={name} name="name" id="name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="email" class="text-right">Email</Label>
          <Input bind:value={email} name="email" id="email" class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Dialog.Close>
					<Button type="submit">add client</Button>
				</Dialog.Close>
      </Dialog.Footer>
    </form>
    </Dialog.Content>
  </Dialog.Root>