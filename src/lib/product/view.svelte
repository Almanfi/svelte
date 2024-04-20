<script lang="ts">
  import { enhance } from '$app/forms';
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Textarea } from "$lib/components/ui/textarea";
   
    const productState = ["pending", "in progress", "done", "canceled"];
    export let user: any = undefined;
    export let product : 
    {
        name: string,
        versions: {
          id: string,
          version: number,
          note: string,
          state: string,
          startDate: string,
          deadline: string,
          atachement: string,
          }[]
    };
    let selectedVersion = {
        value: product.versions.length - 1,
    };

    $: versionToDisplay = product.versions[selectedVersion.value];
    $: selectedState = {value: versionToDisplay.state}
    let selectedStateValue : string | undefined = "";

    //date picker
    import { formattedDate } from "$lib/utils";
    import DatePicker from "$lib/data-table/date-picker.svelte";
    let startDate : string | undefined = undefined;
    let deadline : string | undefined = undefined;

    import { toast } from "svelte-sonner";
    $: {
      if (deadline && startDate && startDate > deadline) {
        deadline = undefined;
        toast("product infomation incorrect", {
      description: "the deadline must be after the start date",
      });
      }
    }

    function userIsAtLeast(user: any, group: string[]): boolean {
      while (group.length > 0) {
        if (user?.group?.includes(group.pop())) {
          return true;
        }
      }
      return false;
    }

    function latestVersion(product: any): any {
      return product.versions[product.versions.length - 1];
    }

    function isLatestVersion(version: any, product: any): boolean {
      return version.id === latestVersion(product).id;
    }
    
    let editMode = false;

  </script>
   
  <Card.Root class="w-[350px]">
    <Card.Header>
      <Card.Title>product info</Card.Title>
    </Card.Header>

    <form action="/product/version/{versionToDisplay.id}?/updateVersion" method="post" enctype="multipart/form-data"
    use:enhance={({ formData, cancel}) => {
      console.log("-----------------------------");
      const plainFormData = Object.fromEntries(formData.entries());
      console.log("submitted data in the making: " + JSON.stringify(plainFormData));
      // cancel();
      editMode=false;
  
      return async ({ result, update }) => {
        // `result` is an `ActionResult` object
        // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
        if (result.type === "success" && result.data) {
          console.log("submitted data with success");
          let newClient = result.data.body;
          console.log("returned data: " + JSON.stringify(newClient));
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

    <!-- <form method="post" use:enhance enctype="multipart/form-data"> -->
    <Card.Content>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="name">Name</Label>
            <div class=" border rounded-md p-1">{product.name}</div>
            <!-- <Input disabled id="name" placeholder={product.name} /> -->
          </div>

          <div class="flex flex-col space-y-1.5">
            <Label for="version">version</Label>
            {#if !editMode}
            <Select.Root bind:selected={selectedVersion} >
              <Select.Trigger id="version">
                <Select.Value placeholder={versionToDisplay.version.toString()}/>
              </Select.Trigger>
              <Select.Content>
                {#each product.versions as version, idx}
                  <Select.Item value={idx} label={version.version.toString()}
                    >{version.version}</Select.Item
                  >
                {/each}
              </Select.Content>
            </Select.Root>
            {:else}
            <div class=" border rounded-md p-[0.45rem] px-3 text-sm">{versionToDisplay.version.toString()}</div>
            {/if}
          </div>

          <input id="id" name="id" hidden type="text" value={versionToDisplay.id} />
          
          <div class="flex flex-col space-y-1.5">
            <Label for="state">state</Label>
            {#if editMode}
            <Select.Root name="state"
            selected={selectedState}
            onSelectedChange={(v) => {
              v && (selectedStateValue = v.value);
            }}
            >
              <Select.Trigger id="state" name="state" value="hi">
                <Select.Value placeholder={selectedState.value} />
              </Select.Trigger>
              <Select.Content>
                {#each productState as state, idx}
                  <Select.Item value={state} label={state}
                    >{state}</Select.Item
                  >
                {/each}
              </Select.Content>
            </Select.Root>
            <input hidden id="state" name="state" value={selectedStateValue} />
            {:else}
            <div class=" border rounded-md p-[0.45rem] px-3 text-sm">{versionToDisplay.state}</div>
            {/if}
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="note">Note</Label>
            {#if editMode}
            <Textarea id="note" name="note" placeholder={versionToDisplay.note} />
            {:else}
            <div class=" border rounded-md p-[0.45rem] px-3 text-sm">{versionToDisplay.note}</div>
            {/if}
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="startDate">startDate</Label>
            {#if editMode && userIsAtLeast(user, ["admin", "sale"])}
            <DatePicker bind:date={startDate} oldDate={formattedDate(versionToDisplay.startDate)} />
            <input id="startDate" name="startDate" hidden type="text" bind:value={startDate} />
            {:else}
            <div class=" border rounded-md p-[0.45rem] px-3 text-sm">
              {formattedDate(versionToDisplay.startDate)}
            </div>
            {/if}
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="deadline">deadline</Label>
            {#if editMode && userIsAtLeast(user, ["admin", "sale"])}
            <DatePicker bind:date={deadline} oldDate={formattedDate(versionToDisplay.deadline)}/>
            <input id="deadline" name="deadline" hidden type="text" bind:value={deadline}  />
            {:else}
            <div class=" border rounded-md p-[0.45rem] px-3 text-sm">
              {formattedDate(versionToDisplay.deadline)}
            </div>
            {/if}
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="atachement">atachement</Label>
            {#if editMode && userIsAtLeast(user, ["admin", "sale"])}
            <Input name="atachement" id="atachement" type="file" placeholder={versionToDisplay.atachement} />
            {:else}
            <div class=" border rounded-md p-[0.45rem] px-3 text-sm">
              {#if versionToDisplay.atachement}
                <a href="/files/{versionToDisplay.atachement}">
                    {versionToDisplay.atachement}
                </a>
              {:else}
                No atachement
              {/if}
            </div>
            {/if}
          </div>

        </div>
      </Card.Content>
      <Card.Footer class="flex justify-between">
        {#if editMode}
        <Button on:click={() => {editMode=false}} variant="outline">Cancel</Button>
        <Button type="submit" class="ml-auto w-20">Save</Button>
        {:else if isLatestVersion(versionToDisplay, product) || userIsAtLeast(user, ["admin"])}
        <Button on:click={() => {editMode=true}} class="ml-auto w-20">Edit</Button>
        {:else}
        <Button disabled class="ml-auto w-20 disabled:">can't Edit</Button>
        {/if}
      </Card.Footer>
    </form>
  </Card.Root>
  
  