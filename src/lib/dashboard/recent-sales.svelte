<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import { cn } from "$lib/utils.js";
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn("space-y-8", className)}>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>OM</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Olivia Martin</p>
			<p class="text-sm text-muted-foreground max-[400px]:hidden">olivia.martin@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$1,999.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="flex h-9 w-9 items-center justify-center space-y-0 border">
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>JL</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Jackson Lee</p>
			<p class="text-sm text-muted-foreground max-[400px]:hidden">jackson.lee@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$39.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>IN</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
			<p class="text-sm text-muted-foreground max-[400px]:hidden">isabella.nguyen@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$299.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>WK</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">William Kim</p>
			<p class="text-sm text-muted-foreground max-[400px]:hidden">will@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$99.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>SD</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Sofia Davis</p>
			<p class="text-sm text-muted-foreground max-[400px]:hidden">sofia.davis@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$39.00</div>
	</div>
</div>
