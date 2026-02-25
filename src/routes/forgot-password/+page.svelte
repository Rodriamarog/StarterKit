<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
</script>

<div class="min-h-screen bg-white flex items-center justify-center px-5">
	<div class="w-full max-w-md">
		<!-- Logo -->
		<div class="mb-8 flex justify-center">
			<a href="/" class="text-lg">
				<span class="font-bold text-slate-800">Alert</span><span class="text-slate-500">as</span>
			</a>
		</div>

		<!-- Heading -->
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold text-gray-900 mb-2">Forgot password?</h1>
			<p class="text-slate-600">Enter your email and we'll send you a link to reset your password.</p>
		</div>

		<!-- Success Message -->
		{#if form?.success}
			<div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
				<div class="flex items-start gap-3">
					<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<div>
						<h3 class="text-sm font-medium text-green-800">Check your email</h3>
						<p class="text-xs text-green-700 mt-1">
							If an account exists with <strong>{form.email}</strong>, you will receive a reset link shortly.
						</p>
					</div>
				</div>
			</div>
		{/if}

		{#if !form?.success}
			<form method="POST" use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}} class="space-y-6">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-900 mb-2">Email address</label>
					<input
						id="email"
						name="email"
						type="email"
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
						placeholder="you@example.com"
						required
						disabled={loading}
					/>
				</div>

				<button
					type="submit"
					class="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={loading}
				>
					{loading ? 'Sending...' : 'Send reset link'}
				</button>
			</form>
		{/if}

		<div class="mt-8 text-center">
			<a href="/login" class="text-sm text-slate-600 hover:text-gray-900">← Back to login</a>
		</div>
	</div>
</div>
