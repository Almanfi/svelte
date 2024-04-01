<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
   
    export let product : 
    {
        name: string,
        versions: {
            id: string,
            version: number,
            note: string,
            state: string,
        }[]
    };
    let selectedVersion = {
        value: product.versions.length - 1,
    };

    $: versionToDisplay = product.versions[selectedVersion.value];

  </script>
   
  <Card.Root class="w-[350px]">
    <Card.Header>
      <Card.Title>Create project</Card.Title>
      <Card.Description>Deploy your new project in one-click.</Card.Description>
    </Card.Header>
    <Card.Content>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="name">Name</Label>
            <div class=" border rounded-md p-1">{product.name}</div>
            <!-- <Input disabled id="name" placeholder={product.name} /> -->
          </div>

          <div class="flex flex-col space-y-1.5">
            <Label for="version">version</Label>
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
          </div>

          <!-- <div class="flex flex-col space-y-1.5">
            <Label for="version">Version</Label>
            <div class=" border rounded-md p-1">{versionToDisplay.version}</div>
            <Input disabled id="version" placeholder={product.version} />
          </div> -->
          <div class="flex flex-col space-y-1.5">
            <Label for="state">state</Label>
            <div class=" border rounded-md p-1">{versionToDisplay.state}</div>
            <!-- <Input disabled id="state" placeholder={product.state} /> -->
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="note">Note</Label>
            <div class=" border rounded-md p-1">{versionToDisplay.note}</div>
            <!-- <Input disabled id="note" placeholder={product.note} /> -->
          </div>

        </div>
      </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button>Deploy</Button>
    </Card.Footer>
  </Card.Root>
  
  