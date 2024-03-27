<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import { enhance } from '$app/forms';
	import { onMount, onDestroy } from 'svelte';
	import DarkMode from '$lib/components/premade/darkMode.svelte';
	import UserMenu from './userMenu.svelte';
	import LeftPanel from './leftPanel.svelte';
  import * as Avatar from "$lib/components/ui/avatar";

</script>

<div class="min-h-full">
	<nav class="bg-slate-900">
      <div class="flex">
        {#if data.user}
        <div class="p-2">
          <LeftPanel>
            <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              >
              <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </LeftPanel>
      </div>
        {/if}
				<div class="flex-shrink-0 p-2">
					<img
						class="h-8 w-8"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
						alt="Your Company"
					/>
				</div>

        <div class="ml-auto flex p-2">
          <DarkMode />
        </div>
        {#if data.user}
        <div class="p-2">
          <UserMenu>
            <Avatar.Root>
              <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
              <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
      </UserMenu>
    </div>
      {/if}



		</div>
	</nav>
</div>
