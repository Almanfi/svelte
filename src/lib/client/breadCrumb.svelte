<script lang="ts">
    import * as Breadcrumb from "$lib/components/ui/breadcrumb";
    export let client : {
        name: string;
    }

</script>

<Breadcrumb.Root>
    <Breadcrumb.List>
        <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
            <Breadcrumb.Link href="/client">Client</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
        {#if client}
        <Breadcrumb.Link>{client.name}</Breadcrumb.Link>
        {/if}
      </Breadcrumb.Item>
    </Breadcrumb.List>
</Breadcrumb.Root>