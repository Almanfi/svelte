<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { toast } from 'svelte-sonner';
	import { Ellipsis } from 'lucide-svelte';
	import * as Collapsible from "$lib/components/ui/collapsible";

	export let client: {
		id: number;
		name: string;
		email: string;
	};

</script>

<div class="h-full w-full grid md:gap-4 gap-2 sm:grid-cols-2 md:grid-cols-2">
	<Card.Root>
		<Card.Header
			class="flex flex-row items-center justify-between space-y-0 pt-2 pb-0"
		>
			<Card.Title class="text-sm font-medium">Name</Card.Title>
		</Card.Header>
		<Card.Content class="py-2">
			<div class="text-2xl font-bold ">{client.name}</div>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header
			class="flex flex-row items-center justify-between space-y-0 pt-2 pb-0"
		>
			<Card.Title class="text-sm font-medium">Email</Card.Title>
		</Card.Header>
		<Card.Content class="py-2">
			<div class="text-2xl font-bold ">{client.email}</div>
		</Card.Content>
	</Card.Root>
	<Card.Root class="p-0 sm:hidden">
		<Card.Content class="py-2">
			<div class="text-md font-bold text-center">
				show more
				<Ellipsis class="h-6 w-6 inline" />
			</div>
		</Card.Content>
	</Card.Root>
</div>


<!-- <Card.Root class="h-full w-full">
	<Card.Header>
		<Card.Title class="text-lg text-center">Client informations</Card.Title>
	</Card.Header>

	<Card.Content>
		<div class="grid items-center gap-4">
			<div class="flex flex-col space-y-3 justify-center">
				<Label for="name">Name</Label>
				<div class="border rounded-md p-1">{client.name}</div>
				<div class="flex flex-col space-y-3">
					<Label for="name">Email</Label>
					<div class="border rounded-md p-1">{client.email}</div>
				</div>
			</div>
		</div>
  </Card.Content>
</Card.Root> -->
