<script lang="ts">
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };

	export let navIteams : {name: string, href: string}[];
</script>

<nav class={cn("flex items-center space-x-4 lg:space-x-6", className)}>
	{#each navIteams as navItem (navItem.name)}	
	<a href={navItem.href} class="text-sm font-medium transition-colors hover:text-primary">
		{navItem.name}
	</a>
	{/each}
	<a
		href="/examples/dashboard"
		class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		Products
	</a>
</nav>
