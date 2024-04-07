<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { enhance, deserialize } from '$app/forms';
    import { clients } from "$lib/store";
    import { toast } from "svelte-sonner";
 
    let name = '';
    let email = '';

    // async function handleSubmit(event) {
    // event.preventDefault();
    // // if (form && form.success)
    //   // console.log(JSON.stringify(form));
    // // if (form && form.success) form.success();

    // // let form = new FormData(event.target);
    // // const response = await fetch('/client?/createClient', {
    // //   method: 'post',
    // //   body: form
    // // });

    // // const data = deserialize(await response.text()).data.body;
    // // // Now you can access the response data
    
    // // // Update the clients store
    // // $clients = [...$clients, { ...data}];
    // console.log("submitted :" + name + " " + email)
    // }

</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
      add Client
    </Dialog.Trigger>
      <Dialog.Content class="sm:max-w-[425px]">
        <!-- <form on:submit|preventDefault={handleSubmit} action="/client?/createClient" method="post" use:enhance> -->
        <form action="/client?/createClient" method="post" 
        use:enhance={({ formData}) => {
          // `formElement` is this `<form>` element
          // `formData` is its `FormData` object that's about to be submitted
          // `action` is the URL to which the form is posted
          // calling `cancel()` will prevent the submission
          // `submitter` is the `HTMLElement` that caused the form to be submitted
          // const plainFormData = Object.fromEntries(formData.entries());
          // console.log("submitted data in the making: " + JSON.stringify(plainFormData));
      
          return async ({ result, update }) => {
            // `result` is an `ActionResult` object
            // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
            if (result.type === "success" && result.data) {
              console.log("submitted data with success");
              let newClient = result.data.body;
              // console.log("returned client data: " + JSON.stringify(newClient));
              $clients = [...$clients, newClient];
              update();
            }
            else {
                toast("client creation failed", {
                description: result.data.message,
                // action: {
                //   label: "Undo",
                //   onClick: () => console.log("Undo")
                // }
              })
              console.log("error: " + JSON.stringify(result));
            }
          };
        }}>
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