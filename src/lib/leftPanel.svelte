<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    const navIteams = [
        {name: "Home", href: "/"},
        {name: "article", href: "/article"},
        {name: "client", href: "/client"},
    ];
    const side = "left";
</script>
   
<div class="">
    <Sheet.Root>
    <Sheet.Trigger asChild let:builder>
        <Button builders={[builder]} class="p-0 bg-transparent">
            <slot></slot>
        </Button>
    </Sheet.Trigger>
    <Sheet.Content {side}>
        <Sheet.Header>
            <Sheet.Title>
                <div class="flex-shrink-0 p-2">
                    <img
                        class="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                    />
                </div>
        </Sheet.Title>
        <Sheet.Description></Sheet.Description>
        </Sheet.Header>
        <!-- <Command.Item>Calendar</Command.Item> -->
        <div class="grid gap-4 py-4">
        {#each navIteams as item (item.href)}
        <Sheet.Close asChild let:builder>
            <Button builders={[builder]} class="block w-full text-left bg-transparent hover:bg-transparent">
                <div class="grid">
                    <a href="{item.href}" class="block w-full text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-lg font-medium">{item.name}</a>
                </div>
            </Button>
        </Sheet.Close>
        {/each}
        </div>
        <Sheet.Footer>
        </Sheet.Footer>
    </Sheet.Content>
    </Sheet.Root>
</div>

  