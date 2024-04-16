<script lang="ts">
    export let data;
    import {
		DashboardMainNav,
		Search,
		UserNav,
		TeamSwitcher,
	} from "./index.js";
    import { Icons } from "$lib/components/premade/icons";
    import DarkMode from "$lib/components/premade/darkMode.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils.js";
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";
    import MobileLink from "$lib/components/premade/mobile-link.svelte";

    let open = false;

    const navIteams = [
        {name: "Home", href: "/"},
        {name: "article", href: "/article"},
        {name: "clients", href: "/client"},
        {name: "products", href: "/product"},
        {name: "sales", href: "/sales"},
        {name: "production", href: "/production"},
        {name: "admin", href: "/admin"},
    ];
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
<div class="container flex h-14 max-w-screen-2xl items-center">
        {#if data.user}
        <div class="mr-4 hidden md:flex">
            <a href="/" class="mr-6 flex items-center space-x-2">
                <Icons.logo class="h-6 w-6" />
                <span class="hidden font-bold sm:inline-block">
                    svelte
                </span>
            </a>
            <nav class="flex items-center gap-6 text-sm">

			    <!-- <TeamSwitcher /> -->

			    <DashboardMainNav {navIteams} class="mx-6" />
            </nav>
        </div>
        <Sheet.Root bind:open>
            <Sheet.Trigger asChild let:builder>
                <Button
                    builders={[builder]}
                    variant="ghost"
                    class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <Icons.Hamburger class="h-5 w-5" />
                    <span class="sr-only">Toggle Menu</span>
                </Button>
            </Sheet.Trigger>
            <Sheet.Content side="left" class="pr-0">
                <MobileLink href="/" class="flex items-center" bind:open>
                    <Icons.logo class="mr-2 h-4 w-4" />
                    <span class="font-bold">svelte</span>
                </MobileLink>
                    <div class="flex flex-col mt-5">
                        {#each navIteams as navItem, index (navItem + index.toString())}
                            {#if navItem.href}
                                <MobileLink href={navItem.href} bind:open class="text-foreground font-medium text-large rounded-md hover:bg-primary/10 px-6 py-3">
                                    {navItem.name}
                                </MobileLink>
                            {/if}
                        {/each}
                    </div>
            </Sheet.Content>
        </Sheet.Root>
        <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div class="w-full flex-1 md:w-auto lg:flex-none">
                <Search />
            </div>
            <nav class="flex items-center">
                <DarkMode />
                <UserNav />
            </nav>
        </div>
        {:else}
        <div class="flex flex-1 items-center space-x-2 justify-end p-8">
            <DarkMode />
        </div>
        {/if}
    </div>
</header>
