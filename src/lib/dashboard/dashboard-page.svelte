<script lang="ts">
	import Activity from "lucide-svelte/icons/activity";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import DollarSign from "lucide-svelte/icons/dollar-sign";
	import Download from "lucide-svelte/icons/download";
	import Users from "lucide-svelte/icons/users";
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		DashboardMainNav,
		Overview,
		RecentSales,
		Search,
		UserNav,
		TeamSwitcher,
		DashboardHeader,
	} from "./index.js";
	import DatePickerWithRange from "$lib/components/premade/data-table/date-picker-with-range.svelte";
	import DarkMode from '$lib/components/premade/darkMode.svelte';
</script>

<div class="flex-col md:flex">
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="sm:flex items-center justify-between space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
			<div class="flex items-center justify-between space-x-2">
				<!-- <DatePickerWithRange />
				<Button size="sm">
					<Download class="md:mr-2 mr-0 h-4 w-4" />
					<p class="max-[400px]:hidden">
						Download
					</p>
				</Button> -->
			</div>
		</div>
		<Tabs.Root value="overview" class="space-y-4">
			<div class="w-full flex items-center justify-center md:justify-normal">
				<!-- 
				<Tabs.List class="w-fit">
					<Tabs.Trigger class="px-1 sm:px-3" value="overview">Overview</Tabs.Trigger>
					<Tabs.Trigger class="px-1 sm:px-3" value="analytics" disabled>Analytics</Tabs.Trigger>
					<Tabs.Trigger class="px-1 sm:px-3" value="reports" disabled>Reports</Tabs.Trigger>
					<Tabs.Trigger class="px-1 sm:px-3" value="notifications" disabled>Notifications</Tabs.Trigger>
				</Tabs.List>
				 -->
			</div>
			<Tabs.Content value="overview" class="space-y-4">
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
							<DollarSign class="h-4 w-4 text-muted-foreground" />
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
							<Users class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+2350</div>
							<p class="text-xs text-muted-foreground">+180.1% from last month</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Sales</Card.Title>
							<CreditCard class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+12,234</div>
							<p class="text-xs text-muted-foreground">+19% from last month</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Active Now</Card.Title>
							<Activity class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+573</div>
							<p class="text-xs text-muted-foreground">+201 since last hour</p>
						</Card.Content>
					</Card.Root>
				</div>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card.Root class="col-span-4">
						<Card.Header>
							<Card.Title>Overview</Card.Title>
						</Card.Header>
						<Card.Content>
							<Overview />
						</Card.Content>
					</Card.Root>
					<Card.Root class="lg:col-span-3 col-span-4">
						<Card.Header>
							<Card.Title>Recent Sales</Card.Title>
							<Card.Description>You made 265 sales this month.</Card.Description>
						</Card.Header>
						<Card.Content>
							<RecentSales class=""/>
						</Card.Content>
					</Card.Root>
				</div>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
