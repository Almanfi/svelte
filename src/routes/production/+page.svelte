<script lang="ts">
    import type { PageData } from './$types';

    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { enhance, deserialize } from '$app/forms';

    import { products as allProducts } from '$lib/store';
    import * as Table from "$lib/components/ui/table/index.js";
    import { Loader, X, Check, Sparkles, CheckCheck, OctagonAlert, FileText, Ban, Timer } from 'lucide-svelte';


    export let data: PageData;

    // allProducts.set(data.products);
    let products = data.products;
    // console.log(data);
    // let products = $allProducts

    // date picker
    import DatePicker from "$lib/data-table/date-picker.svelte";
    let startDate : string | undefined = undefined;
    let deadline : string | undefined = undefined;

    import { formattedDate } from "$lib/utils";

    import { toast } from "svelte-sonner";
    $: {
      if (deadline && startDate && startDate > deadline) {
        deadline = undefined;
        toast("product infomation incorrect", {
      description: "the deadline must be after the start date",
      });
      }
    }

    // let SelectedClient = "";

    // $: clientId = SelectedClient.split(' ')[0];
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
    
    const productState = ["in progress", "done", "canceled"];
    
    let openProduct = undefined;
    let viewedProductVersion: {
      productName: string,
      productId: string,
      name: string,
      id: string,
      version: number,
      note: string,
      state: string,
      startDate: string,
      deadline: string,
      atachement: string,
    }
    let selectedState = undefined;
    function openDrawer(id: string) {
      document.getElementById('drawerOpener')?.click();
      console.log(id);

      openProduct = products.find(product => product.id === id);
      viewedProductVersion = {productName: openProduct.name,
              productId: openProduct.id,
              ...openProduct.versions[openProduct.versions.length - 1]};
      console.log(viewedProductVersion);
      selectedState = {value: viewedProductVersion.state}
    }

    function findStatus(product) {
      return product.versions[product.versions.length - 1].state;
    }
    
</script>

<h1 class="mx-auto text-center my-4">Available products</h1>

<div class="rounded-md border max-w-[90%] m-auto bg-card text-card-foreground shadow">
  <Table.Root >
    <Table.Header>
      <Table.Row>
        <!-- <Table.Head class="w-[100px]">id</Table.Head> -->
        <Table.Head class="">name</Table.Head>
        <Table.Head class="text-center">version</Table.Head>
        <Table.Head class="text-center">status</Table.Head>
        <Table.Head class="text-center hidden sm:table-cell">start Date</Table.Head>
        <Table.Head class="text-center hidden sm:table-cell">deadline</Table.Head>
        <Table.Head class="text-center sm:hidden table-cell">
          <Timer class="m-auto w-4 h-6 font-bold" />
        </Table.Head>
        <Table.Head class="text-center  sm:table-cell">file</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each products as product (product.id)}
      <Table.Row on:click={() => openDrawer(product.id)}>
        <!-- <a href="/product/{product.id}">
          <Table.Cell class="font-medium">{product.id}</Table.Cell>
        </a> -->
        <Table.Cell class="whitespace-nowrap">{product.name}</Table.Cell>
        {#if product.versions}
        <Table.Cell class="text-center">{product.versions[product.versions.length - 1].version}</Table.Cell>
        {:else}
        <Table.Cell class="text-center">0</Table.Cell>
        {/if}
        <Table.Cell class="text-center">
          {#if findStatus(product) === 'in progress'}
          <Loader class="m-auto w-6 h-6 text-blue-500" />
          {:else if findStatus(product) === 'done'}
          <Check class="m-auto w-6 h-6 text-green-500" />
          {:else if findStatus(product) === 'pending'}
          <Sparkles class="m-auto w-6 h-6 text-yellow-500" />
          {:else if findStatus(product) === 'valid'}
          <CheckCheck class="m-auto w-6 h-6 text-emerald-500" />
          {:else if findStatus(product) === 'not valid'}
          <OctagonAlert class="m-auto w-6 h-6 text-red-700" />
          {:else}
          <X class="m-auto w-6 h-6 text-red-500" />
          {/if}
        </Table.Cell>
        <!-- <Table.Cell class="text-center">{findStatus(product)}</Table.Cell> -->
        {#if product.client}
        <Table.Cell class="text-center hidden sm:table-cell">{product.client.name}</Table.Cell>
        {/if}
        <Table.Cell class="text-center hidden sm:table-cell">{formattedDate(product.versions[product.versions.length - 1].startDate)}</Table.Cell>
        <Table.Cell class="text-center">{formattedDate(product.versions[product.versions.length - 1].deadline)}</Table.Cell>
        <Table.Cell class="text-center  sm:table-cell">
        {#if product.versions[product.versions.length - 1].atachement}
          <a href="/files/{product.versions[product.versions.length - 1].atachementt}">
            <FileText class="m-auto text-green-500"/>
          </a>
          {:else}
          <Ban class="m-auto text-red-500"/>
          {/if}
        </Table.Cell>
      </Table.Row>
    {/each}
    </Table.Body>
  </Table.Root>
</div>

<Drawer.Root>
  <Drawer.Trigger id="drawerOpener" class="hidden">Open</Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <a href="/product/{viewedProductVersion.productId}">
        <Drawer.Title>{viewedProductVersion.productName} - {viewedProductVersion.version.toString()}</Drawer.Title>
      </a>
      <Drawer.Description>click product name to visit it's page</Drawer.Description>
    </Drawer.Header>

    <form action="/product/version/{viewedProductVersion.id}?/updateVersion" method="post" enctype="multipart/form-data"
    use:enhance={({ formData, cancel}) => {
      console.log("-----------------------------");
      const plainFormData = Object.fromEntries(formData.entries());
      console.log("submitted data in the making: " + JSON.stringify(plainFormData));
      document.getElementById('drawerClosser')?.click();
  
      return async ({ result, update }) => {
        if (result.type === "success" && result.data) {
          console.log("submitted data with success");
          let newData = result.data.body;
          console.log("returned data: " + JSON.stringify(newData));
          console.log("--------------- version is : " + newData.version);
          products = products.map(product =>
            product.id === viewedProductVersion.productId
              ? { ...product, versions: product.versions.map((version) => version.version === newData.version ? newData : version)}
              : product
          );
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
    <Card.Content>
        <div class="grid w-full items-center">


          <input id="prodName" name="prodName" hidden type="text" value={viewedProductVersion.productName} />

          <input id="prodId" name="prodId" hidden type="text" value={viewedProductVersion.productId} />

          <input id="id" name="id" hidden type="text" value={viewedProductVersion.id} />
          
          <div class="flex flex-col space-y-1.5 my-4">
            <Select.Root name="state"
            selected={selectedState}
            onSelectedChange={(v) => {
              v && (selectedState.value = v.value);
            }}
            >
              <Select.Trigger id="state" name="state" value="">
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
            <input hidden id="state" name="state" value={selectedState.value} />
          </div>

          {#if selectedState.value === "canceled"}
          <div class="flex flex-col space-y-1.5" transition:slideFade={{duration: 400}}>
            <Label for="note">Note</Label>
            <Textarea required id="note" name="note" placeholder={viewedProductVersion.note} />
          </div>
          {/if}

        </div>
      </Card.Content>
      <Card.Footer class="flex justify-between">
        <Drawer.Close id="drawerClosser">Cancel</Drawer.Close>
          <Button type="submit" class="ml-auto w-20">Save</Button>
      </Card.Footer>
    </form>
  </Drawer.Content>
</Drawer.Root>
