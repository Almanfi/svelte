<script lang="ts">
    import { enhance } from "$app/forms";
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  </script>
   
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button builders={[builder]} class="bg-transparent p-0 hover:bg-transparent">
        <slot></slot>
        </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
          <a href="/user">
            <DropdownMenu.Item>
            Profile
            <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </a>
        <a href="/">
            <DropdownMenu.Item>
                Settings
                <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
        </a>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item>Team</DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Email</DropdownMenu.Item>
            <DropdownMenu.Item>Message</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>More...</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Item>
          New Team
          <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <form method="post" action="/logout" use:enhance>
        <button type="submit" class="w-full">
            <DropdownMenu.Item>
                Log out
                <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
        </button>
      </form>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
