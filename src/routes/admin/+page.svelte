<script lang="ts">
    import type { PageData } from './$types';

    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { enhance, deserialize } from '$app/forms';

    import * as Table from "$lib/components/ui/table/index.js";

    export let data: PageData;

    let users = data.users;

    let groups = data.groups;
    let groupsCpy = undefined;
    let selectedGroups: string = "";

    $: {
      selectedGroups = groupsCpy?.filter(group => group.slected).map(group => group.name).join(",");
      console.log("selected groups: " + selectedGroups);
    }

    import { toast } from "svelte-sonner";

    import * as Drawer from "$lib/components/ui/drawer";
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import { Textarea } from "$lib/components/ui/textarea";

    import { slide, fade, crossfade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    const slideFade = (node, { delay = 0, duration = 400, easing = cubicOut }) => {
      const slideTransition = slide(node, { delay, duration, easing });
      const fadeTransition = fade(node, { delay, duration: duration * 2, easing });

      return {
        delay,
        duration,
        easing,
        css: (t, u) => `${slideTransition.css(t, u)} ${fadeTransition.css(t, u)}`
      };
    };
    

    let openUser = undefined;
    let viewedUser: {
      name: string,
      id: string,
      userGroup: {name: string}[],
    }
    function openDrawer(id: string) {
      document.getElementById('drawerOpener')?.click();
      console.log(id);

      groupsCpy = groups.map(group => {
        return {
          ...group,
          slected: false
        }
      });
      openUser = users.find(user => user.id === id);
      for (let group of groupsCpy) {
        if (openUser.userGroup.find(userGroup => userGroup.id === group.id)) {
          group.slected = true;
        }
      }
      viewedUser = {
        id: openUser.id,
        name: openUser.name,
        userGroup: openUser.userGroup,
    };
      console.log(viewedUser);
    }

    import { Checkbox } from "$lib/components/ui/checkbox";
    let checked : boolean = false;

    import CaretSort from "svelte-radix/CaretSort.svelte";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import * as ToggleGroup from "$lib/components/ui/toggle-group";

    import * as Tabs from '$lib/components/ui/tabs/index.js';
    
</script>


<div class="flex-col md:flex">
	<div class="flex-1 space-y-4 p-8 pt-6">

    <Tabs.Root value="teamSelect" class="space-y-4">
      <div class="w-full flex items-center justify-center md:justify-normal max-w-[90%] m-auto">
        <Tabs.List class="w-fit">
          <Tabs.Trigger class="px-1 sm:px-3" value="teamSelect">select user team</Tabs.Trigger>
          <Tabs.Trigger class="px-1 sm:px-3" value="adminSelect">select admins</Tabs.Trigger>
        </Tabs.List>
      </div>

      <Tabs.Content value="teamSelect" class="space-y-4">
        <div class="rounded-md border max-w-[90%] m-auto">
          <Table.Root >
            <Table.Header>
              <Table.Row>
                <Table.Head class="">name</Table.Head>
                <Table.Head class="text-center hidden sm:table-cell">email</Table.Head>
                <Table.Head class="text-center min-w-[140px]">group</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each users as user (user.id)}
              <Table.Row on:click={() => openDrawer(user.id)} class="{user.userGroup.filter(g => g.name === 'admin').length !== 0 ? 'bg-red-800 bg-opacity-10' : ''}">
                <Table.Cell class="whitespace-nowrap">{user.username}</Table.Cell>
                <Table.Cell class="text-center hidden sm:table-cell">{user.email ? user.email : "none"}</Table.Cell>
                <Table.Cell class="text-center h-14">
                    {#each user.userGroup as group, idx}
                        {group.name}
                        {#if idx < user.userGroup.length - 1}
                            {", "}
                        {/if}
                    {/each}
                </Table.Cell>
              </Table.Row>
            {/each}
            </Table.Body>
          </Table.Root>
        </div>
      </Tabs.Content>

      <Tabs.Content value="adminSelect" class="space-y-4">
        <div class="rounded-md border max-w-[90%] m-auto">
          <Table.Root >
            <Table.Header>
              <Table.Row>
                <Table.Head class="">name</Table.Head>
                <Table.Head class="text-center">email</Table.Head>
                <Table.Head class="text-center min-w-[140px]">admin status</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each users as user (user.id)}
              <Table.Row>
                <Table.Cell class="whitespace-nowrap">{user.username}</Table.Cell>
                <Table.Cell class="text-center">{user.email ? user.email : "none"}</Table.Cell>
                <Table.Cell class="text-center h-14">
                  {#if user.userGroup.filter(g => g.name === 'admin').length !== 0}
                    <form action="?/demoteFromAdmin" method="post"
                    use:enhance={({ formData, cancel}) => {
                      console.log("-----------------------------");
                      const plainFormData = Object.fromEntries(formData.entries());
                      console.log("submitted data in the making: " + JSON.stringify(plainFormData));
                      document.getElementById('drawerClosser')?.click();
                  
                      return async ({ result, update }) => {
                        console.log(result);
                        if (result.type === "success" && result.data) {
                          let newData = result.data.body;
                          users = users.map(user => 
                            user.id === newData.id 
                              ? { ...user, userGroup: newData.userGroup }
                              :user 
                          );
                        update();
                        }
                        else {
                            toast("user update failed", {
                            description: result.data.message,
                          })
                          console.log("error: " + JSON.stringify(result));
                        }
                      };
                    }}
                    >
                      <input type="hidden" name="userId" value={user.id}>
                      <Button variant="outline" type="submit" class="text-red-800" size="sm">
                        demote
                      </Button>
                    </form>
                  {:else}
                    <form action="?/promoteToAdmin" method="post"
                    use:enhance={({ formData, cancel}) => {
                      console.log("-----------------------------");
                      const plainFormData = Object.fromEntries(formData.entries());
                      console.log("submitted data in the making: " + JSON.stringify(plainFormData));
                      document.getElementById('drawerClosser')?.click();
                  
                      return async ({ result, update }) => {
                        console.log(result);
                        if (result.type === "success" && result.data) {
                          let newData = result.data.body;
                          users = users.map(user => 
                            user.id === newData.id 
                              ? { ...user, userGroup: newData.userGroup }
                              :user 
                          );
                        update();
                        }
                        else {
                            toast("user update failed", {
                            description: result.data.message,
                          })
                          console.log("error: " + JSON.stringify(result));
                        }
                      };
                    }}
                    >
                      <input type="hidden" name="userId" value={user.id}>
                      <Button variant="outline" type="submit" class="text-green-800" size="sm">
                        promote
                      </Button>
                    </form>
                  {/if}
                </Table.Cell>
              </Table.Row>
            {/each}
            </Table.Body>
          </Table.Root>
        </div>
      </Tabs.Content>
    </Tabs.Root>

</div>
</div>



<Drawer.Root>
  <Drawer.Trigger id="drawerOpener" class="hidden">Open</Drawer.Trigger>
  <Drawer.Content>
    <div class="flex justify-center items-center max-w-md m-auto">
    <Drawer.Header>
        <Drawer.Title>{viewedUser.name}</Drawer.Title>
      <Drawer.Description>email: {viewedUser.email ? viewedUser.email : "none"}</Drawer.Description>
    </Drawer.Header>
    </div>

    <form action="?/updateUser" method="post"
    use:enhance={({ formData, cancel}) => {
      console.log("-----------------------------");
      const plainFormData = Object.fromEntries(formData.entries());
      console.log("submitted data in the making: " + JSON.stringify(plainFormData));
      document.getElementById('drawerClosser')?.click();
  
      return async ({ result, update }) => {
        console.log(result);
        if (result.type === "success" && result.data) {
          let newData = result.data.body;
          users = users.map(user => 
            user.id === newData.id 
              ? { ...user, userGroup: newData.userGroup }
              :user
          );
          update();
        }
        else {
            toast("user update failed", {
            description: result.data.message,
          })
          console.log("error: " + JSON.stringify(result));
        }
      };
    }}>

        <div class="grid w-full items-center">
          <input id="UserId" name="UserId" hidden type="text" value={viewedUser.id} />

          <input id="groups" name="groups" hidden type="text" bind:value={selectedGroups} />
          <Collapsible.Root class="w-[350px] space-y-2 m-auto">
            <div class="flex items-center justify-between space-x-4 px-4">
              <h4 class="text-sm font-semibold">select user groups</h4>
              <Collapsible.Trigger asChild let:builder>
                <Button builders={[builder]} variant="ghost" size="sm" class="w-9 p-0">
                  <CaretSort class="h-4 w-4" />
                  <span class="sr-only">Toggle</span>
                </Button>
              </Collapsible.Trigger>
            </div>
            <Collapsible.Content class="space-y-2">
              {#each groupsCpy as group, idx}
                <div class="rounded-md border px-4 py-3 font-mono text-sm">
                  <div class="flex items-center space-x-2">
                    <Checkbox id="terms" bind:checked={group.slected} />
                    <Label
                      for="terms"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {group.name} team
                    </Label>
                  </div>
                </div>
              {/each}
            </Collapsible.Content>
          </Collapsible.Root>

        </div>

      <Drawer.Footer>
        <div class="flex justify-between w-[350px] space-y-2 m-auto">
          <Drawer.Close id="drawerClosser">Cancel</Drawer.Close>
          <Button type="submit" class="ml-auto w-20">Save</Button>
        </div>
      </Drawer.Footer>
    </form>
  </Drawer.Content>
</Drawer.Root>