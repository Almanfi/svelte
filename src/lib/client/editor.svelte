<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { enhance, deserialize } from '$app/forms';
    // import { clients } from "$lib/store";
    import { toast } from "svelte-sonner";

    export let client: {
        id: number;
        name: string;
        email: string;
    };

</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
      edit
    </Dialog.Trigger>
      <Dialog.Content class="sm:max-w-[425px]">
        <!-- <form on:submit|preventDefault={handleSubmit} action="/client?/createClient" method="post" use:enhance> -->
        <form action="/client/{client.id}?/updateClient" method="post" 
        use:enhance={({ formData}) => {
          return async ({ result, update }) => {
            if (result.type === "success" && result.data) {
              let newClient = result.data.body;
              client = newClient;
              update();
            }
            else {
                toast("client creation failed", {
                description: result.data.message,
              })
              console.log("error: " + JSON.stringify(result));
            }
          };
        }}>
        <Dialog.Header>
          <Dialog.Title>update client</Dialog.Title>
          <Dialog.Description>
            Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input bind:value={client.name} name="name" id="name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="email" class="text-right">Email</Label>
          <Input bind:value={client.email} name="email" id="email" class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer class="flex-row justify-end">
        <Dialog.Close>
					<Button type="submit">save</Button>
				</Dialog.Close>
      </Dialog.Footer>
    </form>
    </Dialog.Content>
  </Dialog.Root>