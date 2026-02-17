<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const PRICE_IDS = {
		pro: 'price_1T1bbpGuXgoZ26lBtPBPrYxM',
		business: 'price_1T1bbyGuXgoZ26lBiqKFufLk'
	};

	let error = '';
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch('/api/create-checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					priceId: PRICE_IDS[data.tier as 'pro' | 'business']
				})
			});

			const result = await response.json();

			if (response.ok && result.url) {
				window.location.href = result.url;
			} else {
				error = result.error || 'Failed to create checkout session';
				loading = false;
			}
		} catch (err) {
			console.error('Error:', err);
			error = 'Failed to start checkout process';
			loading = false;
		}
	});
</script>

<div class="min-h-screen bg-white flex items-center justify-center px-4">
	<div class="max-w-md w-full text-center">
		{#if loading}
			<div class="flex flex-col items-center gap-4">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
				<h2 class="text-2xl font-bold text-gray-900">Redirecting to checkout...</h2>
				<p class="text-slate-600">Please wait while we prepare your payment page</p>
			</div>
		{:else if error}
			<div class="bg-red-50 border border-red-200 rounded-lg p-6">
				<h2 class="text-2xl font-bold text-red-900 mb-2">Error</h2>
				<p class="text-red-700 mb-4">{error}</p>
				<a href="/" class="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
					Go back home
				</a>
			</div>
		{/if}
	</div>
</div>
