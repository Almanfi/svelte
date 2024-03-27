<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';

	export let client: {
		name: string;
		id: string;
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>add pruduct</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<form action="/product?/createProduct" method="post" use:enhance>
			<Dialog.Header>
				<Dialog.Title>add product</Dialog.Title>
				<Dialog.Description>add new product here. Click save when you're done.</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input name="name" id="name" class="col-span-3" />
				</div>
				{#if client}
					<input type="hidden" name="clientId" bind:value={client.id} />
				{/if}
			</div>
			<Dialog.Footer>
				<Dialog.Close>
					<Button type="submit">add product</Button>
				</Dialog.Close>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
