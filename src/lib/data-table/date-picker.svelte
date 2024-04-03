<script lang="ts">
    import CalendarIcon from "svelte-radix/Calendar.svelte";
    import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
    } from "@internationalized/date";
    import { cn } from "$lib/utils";
    import { Calendar } from "$lib/components/ui/calendar";
    import { Button } from "$lib/components/ui/button";
    import * as Popover from "$lib/components/ui/popover";

    const df = new DateFormatter("en-US", {
    dateStyle: "long"
    });

    let value: DateValue | undefined = undefined;
    export let oldDate: string | undefined = 'Pick a date';
    export let date: string | undefined = undefined;
    $: date = value?.toDate(getLocalTimeZone()).toISOString();
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : oldDate}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
        <Calendar bind:value />
	</Popover.Content>
</Popover.Root>
