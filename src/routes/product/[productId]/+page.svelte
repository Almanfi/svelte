<script lang="ts">
    import type { PageData } from './$types';
    import BreadCrumb from '$lib/client/breadCrumb.svelte';
    import ProductAdder from '$lib/product/adder.svelte';
    import ProductTable from '$lib/product/table.svelte';
    import ProductView from '$lib/product/view.svelte';
    import VersionAdder from '$lib/product/versionAdder.svelte';
    import { userIsAtLeast } from '$lib/utils';
    export let data: PageData;
    console.log(data);

    $: product = data.product;
</script>

{#if userIsAtLeast(data.user, ['admin', 'sale'])}
    <div class="flex min-h-full justify-center px-6 pt-12 lg:px-8">
        <VersionAdder {product} />
    </div>
{/if}
<div class="flex min-h-full justify-center px-6 py-6 lg:px-8">
    <ProductView {product} user={data.user} />
</div>
