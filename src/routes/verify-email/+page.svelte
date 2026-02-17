<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		if (data.success) {
			// Redirect to dashboard after 3 seconds
			setTimeout(() => {
				goto('/dashboard');
			}, 3000);
		}
	});
</script>

<div class="min-h-screen flex items-center justify-center bg-[#fafafa] p-4">
	<div class="max-w-md w-full bg-white border border-gray-200 rounded-lg p-8 text-center">
		{#if data.success}
			<div class="mb-4">
				<svg class="w-16 h-16 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h1 class="text-2xl font-semibold text-gray-900 mb-2">Email Verified</h1>
			<p class="text-gray-600 mb-6">
				Your email address has been successfully verified.
			</p>
			<p class="text-sm text-gray-500">
				Redirecting to dashboard in 3 seconds...
			</p>
			<a href="/dashboard" class="mt-4 inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">
				Go to Dashboard
			</a>
		{:else}
			<div class="mb-4">
				<svg class="w-16 h-16 text-red-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h1 class="text-2xl font-semibold text-gray-900 mb-2">Verification Failed</h1>
			<p class="text-gray-600 mb-6">
				{data.error}
			</p>
			<a href="/login" class="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">
				Go to Login
			</a>
		{/if}
	</div>
</div>
