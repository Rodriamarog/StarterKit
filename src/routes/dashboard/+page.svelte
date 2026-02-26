<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	let { data } = $props();

	const tier = $derived(data.user.subscription_tier ?? 'free');
	const tierVariant: Record<string, 'secondary' | 'default' | 'outline'> = {
		free: 'secondary',
		pro: 'default',
		business: 'outline'
	};
</script>

<div class="min-h-screen bg-[#fafafa]">
	<!-- Navigation -->
	<nav class="bg-white border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<svg class="w-8 h-8 text-gray-900" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8 20C8 14 12 10 18 10C24 10 28 14 28 20C28 26 24 30 18 30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
						<path d="M32 20C32 26 28 30 22 30C16 30 12 26 12 20C12 14 16 10 22 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
					</svg>
					<span class="ml-3 text-xl font-semibold text-gray-900">Dashboard</span>
				</div>
				<div class="flex items-center gap-4">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<div class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
								<div class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-medium">
									{data.user.email.charAt(0).toUpperCase()}
								</div>
								<span class="text-sm text-gray-700 hidden md:block">{data.user.email}</span>
							</div>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end" class="w-52">
							<DropdownMenu.Item>
								<a href="/profile" class="w-full">Profile</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<a href="/settings" class="w-full">Settings</a>
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<a href="/logout" class="w-full">Sign out</a>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-semibold text-gray-900">Welcome back</h1>
			<p class="mt-2 text-sm text-gray-600">Manage your account and view your activity</p>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<!-- Subscription Tier -->
			<Card.Root>
				<Card.Content class="pt-6">
					<div class="flex items-center justify-between mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
						</svg>
						<Badge variant={tierVariant[tier] ?? 'secondary'} class="capitalize">{tier}</Badge>
					</div>
					<h3 class="text-sm font-medium text-gray-600">Subscription Plan</h3>
					<p class="mt-2 text-2xl font-semibold text-gray-900 capitalize">{tier}</p>
					{#if tier === 'free'}
						<a href="/checkout?tier=pro" class="mt-2 text-xs text-blue-600 hover:underline inline-block">Upgrade to Pro →</a>
					{:else}
						<p class="mt-1 text-xs text-gray-500">Thank you for subscribing!</p>
					{/if}
				</Card.Content>
			</Card.Root>

			<!-- Security -->
			<Card.Root>
				<Card.Content class="pt-6">
					<div class="flex items-center justify-between mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
						<Badge variant="secondary">Encrypted</Badge>
					</div>
					<h3 class="text-sm font-medium text-gray-600">Security</h3>
					<p class="mt-2 text-2xl font-semibold text-gray-900">Protected</p>
					<p class="mt-1 text-xs text-gray-500">PocketBase authentication</p>
				</Card.Content>
			</Card.Root>

			<!-- Session -->
			<Card.Root>
				<Card.Content class="pt-6">
					<div class="flex items-center justify-between mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<Badge variant="secondary">Active</Badge>
					</div>
					<h3 class="text-sm font-medium text-gray-600">Session</h3>
					<p class="mt-2 text-2xl font-semibold text-gray-900">Active</p>
					<p class="mt-1 text-xs text-gray-500">Managed by PocketBase</p>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Content Cards -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Authentication Details -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Authentication Stack</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-3">
						{#each [
							{ title: 'PocketBase', desc: 'Self-hosted auth & database' },
							{ title: 'Email Verification', desc: 'Built-in verification flow' },
							{ title: 'Cookie Sessions', desc: 'HTTP-only secure cookies' },
							{ title: 'Self-Hosted', desc: 'No external auth dependencies' }
						] as item}
							<div class="flex items-start gap-3">
								<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<div>
									<p class="text-sm font-medium text-gray-900">{item.title}</p>
									<p class="text-xs text-gray-500">{item.desc}</p>
								</div>
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Account Information -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Account Information</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div>
							<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</span>
							<p class="mt-1 text-sm text-gray-900">{data.user.email}</p>
						</div>
						<div>
							<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Account ID</span>
							<p class="mt-1 text-sm text-gray-900">#{data.user.id}</p>
						</div>
					</div>
				</Card.Content>
				<Card.Footer class="gap-3">
					<Button variant="outline" class="flex-1" href="/settings">Settings</Button>
					<Button class="flex-1" href="/profile">Edit Profile</Button>
				</Card.Footer>
			</Card.Root>
		</div>

		<!-- Fines Table -->
		<div class="mt-8">
			<Card.Root>
				<Card.Header>
					<Card.Title>Recent Fines</Card.Title>
				</Card.Header>
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead class="bg-gray-50 border-t border-gray-200">
							<tr>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Licence Plate</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fine</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ABC-1234</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2026-02-15</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$75.00</td>
							</tr>
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">XYZ-5678</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2026-02-14</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$120.00</td>
							</tr>
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">DEF-9012</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2026-02-13</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$50.00</td>
							</tr>
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GHI-3456</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2026-02-12</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$95.00</td>
							</tr>
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">JKL-7890</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2026-02-11</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$150.00</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Card.Root>
		</div>
	</main>
</div>
