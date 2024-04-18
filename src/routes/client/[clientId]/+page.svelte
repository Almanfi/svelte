<script lang="ts">
    import type { PageData } from './$types';
    import BreadCrumb from '$lib/client/breadCrumb.svelte';
    import ProductAdder from '$lib/product/adder.svelte';
    import ClientEditor from '$lib/client/editor.svelte';
    import ClientView from '$lib/client/view.svelte';
    import ClientStat from '$lib/client/stat.svelte';
    import ProductTable from '$lib/product/table.svelte';
    export let data: PageData;
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { Button } from "$lib/components/ui/button";
    import CaretSort from "svelte-radix/CaretSort.svelte";

    $: client = data.client;
    $: products = data.client.products;

</script>

<div class="max-w-[90%] m-auto space-y-4 pt-4">
    <BreadCrumb {client} />
    <div class="flex justify-between">

        <ClientEditor {client} />
        <ProductAdder {client} />
    </div>
    <div class="sm:h-[70vh]">
            <div class="flex justify-center min-w-md my-4"> 
                <ClientView {client} />
            </div>
            <div class="my-4">
                <ProductTable {products} />
            </div>
        </div>
</div>

<!-- <div class="max-w-[90%] m-auto space-y-4 pt-4">
    <BreadCrumb {client} />
    <div class="flex justify-between">

        <ClientEditor {client} />
        <ProductAdder {client} />
    </div>
        <div class="grid gap-8 sm:grid-cols-8">
            <div class="sm:col-span-3 flex flex-col space-y-4"> 
                <ClientView {client} />
                <div class="hidden sm:block">
                    <ClientStat {client} />
                </div>
            </div>
            <div class="sm:col-span-5 sm:h-[70vh]">
                <ProductTable {products} />
            </div>
        </div>
</div> -->

