<script lang="ts">
	import type { PageData } from './$types';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance, deserialize } from '$app/forms';
	import { clients } from '$lib/store';
	import { TriangleAlert } from 'lucide-svelte';

	import ProductTable from '$lib/product/table.svelte';
	import ClientAdder from '$lib/client/adder.svelte';
	import { products as allProducts } from '$lib/store';

	export let data: PageData;

	allProducts.set(data.products);
	// let products = data.products;
	console.log(data);
	let products = $allProducts;

	import ClientSelector from '$lib/client/selector.svelte';

	// date picker
	import DatePicker from '$lib/data-table/date-picker.svelte';
	let startDate: string | undefined = undefined;
	let deadline: string | undefined = undefined;

	import { formattedDate } from '$lib/utils';

	import { toast } from 'svelte-sonner';
	$: {
		if (deadline && startDate && startDate > deadline) {
			deadline = undefined;
			toast('product infomation incorrect', {
				description: 'the deadline must be after the start date'
			});
		}
	}

	let SelectedClient = '';

	$: clientId = SelectedClient.split(' ')[0];

	import * as Drawer from "$lib/components/ui/drawer";
	import * as Card from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import {focusedProductId} from '$lib/store';
	const productState = ["valid", "not valid"];

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
    };
	let selectedState = undefined;
	function openDrawer() {
	  let id = $focusedProductId;
	  if (id === undefined || id === null)
		return;
      document.getElementById('drawerOpener')?.click();

      openProduct = products.find(product => product.id === id);
      viewedProductVersion = {productName: openProduct.name,
              productId: openProduct.id,
              ...openProduct.versions[openProduct.versions.length - 1]};
      console.log(viewedProductVersion);
      selectedState = {value: viewedProductVersion.state}
	  $focusedProductId = null;
    }

	$: console.log($focusedProductId);

	$: productsToReview = products.filter(product => product.versions[product.versions.length - 1].state === "done");

</script>

<div class="flex flex-col items-center justify-center mt-4">
	<h1 class="text-4xl font-bold">Sales</h1>
	<div class="mt-4">
		<div class="flex justify-end w-full">
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'default' })}
					>add new order
				</Dialog.Trigger>

				<Dialog.Content class="max-w-[425px] w-[90%]">
					<form
						action="/product?/createFreshProduct"
						method="post"
						enctype="multipart/form-data"
						use:enhance={({ formData, cancel }) => {
							return async ({ result, update }) => {
								if (result.type === 'success' && result.data) {
									let newClient = result.data.body;
									products = [...products, newClient];
									update();
									document.getElementById('newOrderCloser')?.click();
									toast('product created successfully');
								} else {
									toast('product creation failed', {
										description: result.data.message
									});
									console.log('error: ' + JSON.stringify(result));
								}
							};
						}}
					>
						<Dialog.Header class="mb-6">
							<Dialog.Title>Add new product</Dialog.Title>
						</Dialog.Header>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="client">Client</Label>
								<div class="flex max-[400px]:flex-col items-center justify-between">
									<ClientSelector bind:value={SelectedClient} />
									<div class="min-[400px]:ml-auto">
										<ClientAdder />
									</div>
								</div>
								<input hidden bind:value={clientId} type="text" name="clientId" id="clientId" />
							</div>

							<div class="flex flex-col space-y-1.5">
								<Label for="productName">product Name</Label>
								<Input name="productName" id="productName" type="text" placeholder="product name" />
							</div>

							<div class="flex flex-col space-y-1.5">
								<Label for="startDate">start Date</Label>
								<DatePicker bind:date={startDate} />
								<input id="startDate" name="startDate" hidden type="text" bind:value={startDate} />
							</div>

							<div class="flex flex-col space-y-1.5">
								<Label for="deadline">deadline</Label>
								<DatePicker bind:date={deadline} />
								<input id="deadline" name="deadline" hidden type="text" bind:value={deadline} />
							</div>

							<div class="flex flex-col space-y-1.5">
								<Label for="atachement">atachement</Label>
								<Input
									name="atachement"
									id="atachement"
									type="file"
									placeholder={'versionToDisplay.atachement'}
								/>
							</div>
						</div>

						<Dialog.Footer class="my-2">
							<Dialog.Close class="hidden" id="newOrderCloser">Cancel</Dialog.Close>
							<Button type="submit">Save changes</Button>
						</Dialog.Footer>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
</div>

{#if productsToReview?.length > 0}
<div class="max-w-[90%] m-auto space-y-4 pt-4">
	<h1 class="text-center text-2xl font-bold">Awaiting review</h1>
	<ProductTable products={productsToReview} on:click={openDrawer} />
</div>
{/if}
<div class="max-w-[90%] m-auto space-y-4 pt-4">
	<h1 class="text-center text-2xl font-bold">All products</h1>
	<ProductTable {products} />
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
		const plainFormData = Object.fromEntries(formData.entries());
		console.log("submitted data in the making: " + JSON.stringify(plainFormData));
		document.getElementById('drawerClosser')?.click();
	
		return async ({ result, update }) => {
		  if (result.type === "success" && result.data) {
			let newData = result.data.body;
			products = products.map(product =>
			  product.id === viewedProductVersion.productId
				? { ...product, versions: product.versions.map((version) => version.version === newData.version ? newData : version)}
				: product
			);
			if (newData?.state === "not valid")
				document.getElementById('createNewVersion')?.click();
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

			{#if viewedProductVersion.state !== "done"}
			  <div class="flex my-4 justify-center">
				<TriangleAlert  class="mx-2 text-orange-500"/>
				product can't be validated
			  </div>
			{:else}
			<div class="flex flex-col space-y-1.5 my-4">
			  <Select.Root name="state"
			  selected={selectedState}
			  onSelectedChange={(v) => {
				v && (selectedState.value = v.value);
				if (v.value === "not valid")
				  console.log("not valid");
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
			{/if}
  
		  </div>
		</Card.Content>
		<Card.Footer class="flex justify-between">
		  <Drawer.Close id="drawerClosser">Cancel</Drawer.Close>
		  {#if viewedProductVersion.state === "done"}
		  <Button type="submit" class="ml-auto w-20">Save</Button>
		  {/if}
		</Card.Footer>
	  </form>
	  <form action="/product/version?/createVersion" method="post"
	  use:enhance={({ formData, cancel}) => {
		return async ({ result, update }) => {
		  if (result.type === "success" && result.data) {
			let newData = result.data.body;
			products = products.map(product =>
			  product.id === viewedProductVersion.productId
				? { ...product, versions: [...product.versions, newData]}
				: product
			);
		  	update();
			toast("new version created successfully");
		  }
		  else {
			  toast("client creation failed", {
			  description: result.data.message,
			})
			console.log("error: " + JSON.stringify(result));
		  }
		};
	  }}>
		{#if viewedProductVersion}
			<input type="hidden" name="productId" bind:value={viewedProductVersion.productId} />
		{/if}
		<Button class="hidden" id="createNewVersion" type="submit"></Button>
	</form>
	</Drawer.Content>
  </Drawer.Root>
  