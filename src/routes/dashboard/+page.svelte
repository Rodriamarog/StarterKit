<script lang="ts">
	import { goto } from '$app/navigation';

	let { data } = $props();
	let loading = $state(false);

	async function handleLogout() {
		loading = true;

		try {
			await fetch('/api/logout', {
				method: 'POST'
			});

			goto('/login');
		} catch (err) {
			console.error('Logout failed:', err);
		} finally {
			loading = false;
		}
	}
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
					<div class="dropdown dropdown-end">
						<div tabindex="0" role="button" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
							<div class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-medium">
								{data.user.email.charAt(0).toUpperCase()}
							</div>
							<span class="text-sm text-gray-700 hidden md:block">{data.user.email}</span>
						</div>
						<ul tabindex="0" class="mt-2 z-[1] p-2 shadow-lg menu dropdown-content bg-white rounded-lg w-52 border border-gray-200">
							<li><a href="/profile" class="text-gray-700 hover:bg-gray-50">Profile</a></li>
							<li><a href="/settings" class="text-gray-700 hover:bg-gray-50">Settings</a></li>
							<li class="border-t border-gray-100 mt-1 pt-1">
								<button onclick={handleLogout} disabled={loading} class="text-gray-700 hover:bg-gray-50 w-full text-left">
									{loading ? 'Signing out...' : 'Sign out'}
								</button>
							</li>
						</ul>
					</div>
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
			<div class="bg-white border border-gray-200 rounded-lg p-6">
				<div class="flex items-center justify-between mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
					</svg>
					<span class="px-2 py-1 {data.user.subscription_tier === 'free' ? 'bg-gray-100 text-gray-700' : data.user.subscription_tier === 'pro' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'} text-xs font-medium rounded capitalize">
						{data.user.subscription_tier}
					</span>
				</div>
				<h3 class="text-sm font-medium text-gray-600">Subscription Plan</h3>
				<p class="mt-2 text-2xl font-semibold text-gray-900 capitalize">{data.user.subscription_tier}</p>
				{#if data.user.subscription_tier === 'free'}
					<a href="/#pricing" class="mt-2 text-xs text-blue-600 hover:underline inline-block">Upgrade to Pro →</a>
				{:else}
					<p class="mt-1 text-xs text-gray-500">Thank you for subscribing!</p>
				{/if}
			</div>

			<!-- Security -->
			<div class="bg-white border border-gray-200 rounded-lg p-6">
				<div class="flex items-center justify-between mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
					</svg>
					<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">Encrypted</span>
				</div>
				<h3 class="text-sm font-medium text-gray-600">Security</h3>
				<p class="mt-2 text-2xl font-semibold text-gray-900">Protected</p>
				<p class="mt-1 text-xs text-gray-500">Cookie-based authentication</p>
			</div>

			<!-- Session -->
			<div class="bg-white border border-gray-200 rounded-lg p-6">
				<div class="flex items-center justify-between mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">30 days</span>
				</div>
				<h3 class="text-sm font-medium text-gray-600">Session</h3>
				<p class="mt-2 text-2xl font-semibold text-gray-900">Active</p>
				<p class="mt-1 text-xs text-gray-500">Expires in 30 days</p>
			</div>
		</div>

		<!-- Content Cards -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Authentication Details -->
			<div class="bg-white border border-gray-200 rounded-lg p-6">
				<h3 class="text-base font-semibold text-gray-900 mb-4">Authentication Stack</h3>
				<div class="space-y-3">
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="text-sm font-medium text-gray-900">SQLite Database</p>
							<p class="text-xs text-gray-500">Local user storage</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="text-sm font-medium text-gray-900">bcrypt Hashing</p>
							<p class="text-xs text-gray-500">Secure password encryption</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="text-sm font-medium text-gray-900">Cookie Sessions</p>
							<p class="text-xs text-gray-500">HTTP-only secure cookies</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="text-sm font-medium text-gray-900">Self-Hosted</p>
							<p class="text-xs text-gray-500">No external dependencies</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Account Information -->
			<div class="bg-white border border-gray-200 rounded-lg p-6">
				<h3 class="text-base font-semibold text-gray-900 mb-4">Account Information</h3>
				<div class="space-y-4">
					<div>
						<label class="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</label>
						<p class="mt-1 text-sm text-gray-900">{data.user.email}</p>
					</div>
					<div>
						<label class="text-xs font-medium text-gray-500 uppercase tracking-wide">Account ID</label>
						<p class="mt-1 text-sm text-gray-900">#{data.user.id}</p>
					</div>
					<div class="pt-4 border-t border-gray-200">
						<div class="flex gap-3">
							<a href="/settings" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors text-center">
								Settings
							</a>
							<a href="/profile" class="flex-1 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center">
								Edit Profile
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Fines Table -->
		<div class="mt-8">
			<div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
				<div class="px-6 py-4 border-b border-gray-200">
					<h3 class="text-base font-semibold text-gray-900">Recent Fines</h3>
				</div>
				<div class="overflow-x-auto">
					<table class="table w-full">
						<thead class="bg-gray-50">
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
			</div>
		</div>
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
