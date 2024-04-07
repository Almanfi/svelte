<script lang="ts">
    import type { PageData } from './$types';
    import BreadCrumb from '$lib/client/breadCrumb.svelte';
    import ProductAdder from '$lib/product/adder.svelte';
    import ProductTable from '$lib/product/table.svelte';
    import ProductView from '$lib/product/view.svelte';
    import VersionAdder from '$lib/product/versionAdder.svelte';
    export let data: PageData;

    let product = data.product;
</script>

<div class="flex min-h-full justify-center px-6 pt-12 lg:px-8">
    <VersionAdder {product} />
</div>
<div class="flex min-h-full justify-center px-6 py-6 lg:px-8">
    <ProductView {product}/>
</div>

<!-- <BreadCrumb {product} />

<ProductAdder {product} /> -->

<!-- <ProductTable {products} /> -->


<!-- <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">editing article</h2>
        </div>

        {#if product}
        
        <form class="space-y-6" action="?/updateArticle" method="POST">
            <div>
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900">title</label>
            <div class="mt-2">
                <input id="title" name="title" type="text" value={product.name} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
            </div>
        
            <div>
            <div class="flex items-center justify-between">
                <label for="content" class="block text-sm font-medium leading-6 text-gray-900">content</label>
            </div>
            <div class="mt-2">
                <input id="content" name="content" type="text" value={product.email} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
            </div>
        
            <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">update info</button>
            </div>
        </form>

        {/if}
  
  </div>
  </div> -->