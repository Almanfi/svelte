<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';

	export let product: {
		name: string;
		id: string;
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>add new version</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<form action="/product/version?/createVersion" method="post" use:enhance>
			<Dialog.Header>
				<Dialog.Title>add version to: {product.name}</Dialog.Title>
				<Dialog.Description>add new version here. Click save when you're done.</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				{#if product}
					<input type="hidden" name="productId" bind:value={product.id} />
				{/if}
			</div>
			<Dialog.Footer>
				<Dialog.Close>
					<Button type="submit">yes</Button>
				</Dialog.Close>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
