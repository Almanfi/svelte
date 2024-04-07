<script lang="ts">
    import type { PageData } from './$types';

    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { enhance, deserialize } from '$app/forms';
    import { clients } from "$lib/store";

    import ProductTable from '$lib/product/table.svelte';
    import ClientAdder from '$lib/client/adder.svelte';
    import { products as allProducts } from '$lib/store';
    
    export let data: PageData;
      
    allProducts.set(data.products);
    // let products = data.products;
    console.log(data);
    let products = $allProducts

    import ClientSelector from '$lib/client/selector.svelte';

    // date picker
    import DatePicker from "$lib/data-table/date-picker.svelte";
    let startDate : string | undefined = undefined;
    let deadline : string | undefined = undefined;


    function formattedDate(date: string) {
      if (!date) return 'not set';
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    import { toast } from "svelte-sonner";
    $: {
      if (deadline && startDate && startDate > deadline) {
        deadline = undefined;
        toast("product infomation incorrect", {
      description: "the deadline must be after the start date",
      });
      }
    }

    let SelectedClient = "";

    $: clientId = SelectedClient.split(' ')[0];
</script>

<div class="flex flex-col items-center justify-center">
    
    <h1 class="text-4xl font-bold">Sales</h1>
    <div class="mt-12">
        <div class="flex justify-end w-full" >

            <Dialog.Root>
                <Dialog.Trigger class={buttonVariants({ variant: "default" })}
                  >add new order
                </Dialog.Trigger>

                <Dialog.Content class="max-w-[425px] w-[90%]">
                  <form action="/product?/createFreshProduct" method="post" enctype="multipart/form-data"
                  use:enhance={({ formData, cancel}) => {
                    console.log("-----------------------------");
                    const plainFormData = Object.fromEntries(formData.entries());
                    console.log("submitted data in the making: " + JSON.stringify(plainFormData));
                
                    return async ({ result, update }) => {
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

                  <Dialog.Header class="mb-6">
                    <Dialog.Title>Add new product</Dialog.Title>
                  </Dialog.Header>
                  <!-- clientId, note, state, productName, startDate, deadline, atachement -->
                        <div class="grid w-full items-center gap-4">
                          <div class="flex flex-col space-y-1.5">
                            <Label for="client">Client</Label>
                            <div class="flex max-[400px]:flex-col items-center justify-between">
                                <ClientSelector bind:value={SelectedClient}/>
                                <div class="min-[400px]:ml-auto">
                                  <ClientAdder />
                                </div>
                            </div>
                            <input hidden bind:value={clientId} type="text" name="clientId" id="clientId">
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
                            <input id="deadline" name="deadline" hidden type="text" bind:value={deadline}  />
                          </div>

                          <div class="flex flex-col space-y-1.5">
                            <Label for="atachement">atachement</Label>
                            <Input name="atachement" id="atachement" type="file" placeholder={"versionToDisplay.atachement"} />
                          </div>

                        </div>

                  <Dialog.Footer>
                    <Button type="submit">Save changes</Button>
                  </Dialog.Footer>

                  </form>
                </Dialog.Content>
              </Dialog.Root>


        </div>
    </div>
    <ProductTable {products}/>
</div>