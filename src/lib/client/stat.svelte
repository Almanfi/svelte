<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { toast } from 'svelte-sonner';
	import { products } from '$lib/store';
	import { Hash, LoaderCircle } from 'lucide-svelte';

	export let client: {
		id: number;
		name: string;
		email: string;
		products: any[];
	};
	$: stats = {
		totalProducts: client.products.length,
		inProcess: client.products.filter((p) => p.versions[p.versions.length - 1].state === 'in progress' 
												|| p.versions[p.versions.length - 1].state === 'pending').length,
	};
</script>

<!-- <Card.Root class="h-full">
	<Card.Header>
		<Card.Title class="text-lg text-center">Statistics</Card.Title>
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

<Card.Root>
	<Card.Header
		class="flex flex-row items-center justify-between space-y-0 pb-2"
	>
		<Card.Title class="text-sm font-medium">Total Products</Card.Title>
		<Hash class="h-4 w-4 text-muted-foreground" />
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold ">{stats.totalProducts}</div>
	</Card.Content>
</Card.Root>
<Card.Root>
	<Card.Header
		class="flex flex-row items-center justify-between space-y-0 pb-2"
	>
		<Card.Title class="text-sm font-medium">in queue</Card.Title>
		<LoaderCircle class="h-4 w-4 text-muted-foreground" />
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">{stats.inProcess}</div>
	</Card.Content>
</Card.Root>

<!-- <Card.Root>
	<Card.Header
		class="flex flex-row items-center justify-between space-y-0 pb-2"
	>
		<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
		<Hash class="h-4 w-4 text-muted-foreground" />
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">$45,231.89</div>
		<p class="text-xs text-muted-foreground">+20.1% from last month</p>
	</Card.Content>
</Card.Root>
<Card.Root>
	<Card.Header
		class="flex flex-row items-center justify-between space-y-0 pb-2"
	>
		<Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">+2350</div>
		<p class="text-xs text-muted-foreground">+180.1% from last month</p>
	</Card.Content>
</Card.Root> -->
