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
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>add pruduct</Dialog.Trigger>
	<Dialog.Content class="max-w-[425px] w-[90%]">
		<form
			action="/product?/createFreshProduct"
			method="post"
			enctype="multipart/form-data"
			use:enhance={({ formData, cancel }) => {
				console.log('-----------------------------');
				const plainFormData = Object.fromEntries(formData.entries());
				console.log('submitted data in the making: ' + JSON.stringify(plainFormData));

				return async ({ result, update }) => {
					if (result.type === 'success' && result.data) {
						let newClient = result.data.body;
						update();
						document.getElementById('prodDialogCloser')?.click();
					} else {
						toast('client creation failed', {
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
				<input hidden bind:value={client.id} type="text" name="clientId" id="clientId" />

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

			<Dialog.Footer class="my-4 flex flex-row justify-between">
				<Dialog.Close>
					<Button id="prodDialogCloser" type="button" variant="outline">Cancel</Button>
				</Dialog.Close>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
