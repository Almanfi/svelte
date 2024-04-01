<script lang="ts">
    import type { PageData } from './$types';
    import ProductTable from '$lib/product/table.svelte';
    import ProductAdder from '$lib/product/adder.svelte';
    import { products as allProducts } from '$lib/store';
  
    export let data: PageData;
    allProducts.set(data.products);
    // let products = data.products;
    console.log(data);
    let products = $allProducts
  </script>
  
  
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 max-w-screen-sm">
   <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  
  <!-- <ProductAdder /> -->
  <ProductTable {products}/>
  </div>
  </div>