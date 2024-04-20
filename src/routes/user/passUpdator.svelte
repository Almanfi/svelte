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

</script>

<Dialog.Root>
    <Dialog.Trigger class="{buttonVariants({ variant: "outline" })} border-red-800 text-red-800">
      change password
    </Dialog.Trigger>
      <Dialog.Content class="sm:max-w-[425px]">
        <form action="/user?/updatePass" method="post" 
        use:enhance={({ formData}) => {

          return async ({ result, update }) => {
            if (result.type === "success" && result.data) {
              console.log("submitted data with success");
              let newClient = result.data.body;
              // console.log("returned client data: " + JSON.stringify(newClient));
              // $clients = [...$clients, newClient];
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
        <Dialog.Header>
          <Dialog.Title>change user password</Dialog.Title>
          <Dialog.Description>
            Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="oldPass" class="text-center">old password</Label>
          <Input required name="oldPass" id="oldPass" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="newPass" class="text-center">new password</Label>
          <Input required name="newPass" id="newPass" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="newPass2" class="text-center">confirm password</Label>
          <Input required name="newPass2" id="newPass2" class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Dialog.Close>
					<Button type="submit">save</Button>
				</Dialog.Close>
      </Dialog.Footer>
    </form>
    </Dialog.Content>
  </Dialog.Root>