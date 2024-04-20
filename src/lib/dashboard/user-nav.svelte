<script lang="ts">
	import { enhance } from "$app/forms";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import { CircleUser, Slice } from 'lucide-svelte';

	export let user;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>{user?.username?.slice(0,2).toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				{#if user}
					<div class="flex items-center">
						<CircleUser class="h-4 w-4 text-muted-foreground mx-2" />
						<p class="text-sm font-medium leading-none">{user.username}</p>
					</div>
					{#if user.email}
						<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
					{/if}
				{/if}
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<a href="/user">
				<DropdownMenu.Item>
					Settings
					<!-- <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut> -->
				</DropdownMenu.Item>
			</a>
		</DropdownMenu.Group>
		<form method="post" action="/logout" use:enhance>
			<button type="submit" class="w-full">
				<DropdownMenu.Item>
					Log out
					<!-- <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut> -->
				</DropdownMenu.Item>
			</button>
		  </form>
	</DropdownMenu.Content>
</DropdownMenu.Root>
