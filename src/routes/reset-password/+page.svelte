<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let loading = $state(false);
	let token = $state('');

	// Get token from URL on mount
	$effect(() => {
		const urlToken = $page.url.searchParams.get('token');
		if (urlToken) {
			token = urlToken;
		} else {
			error = 'Invalid reset link';
		}
	});

	async function handleSubmit() {
		error = '';

		if (!password || !confirmPassword) {
			error = 'Please fill in all fields';
			return;
		}

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		if (password.length < 6) {
			error = 'Password must be at least 6 characters';
			return;
		}

		if (!token) {
			error = 'Invalid reset link';
			return;
		}

		loading = true;

		try {
			const response = await fetch('/api/reset-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token, password })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to reset password';
				return;
			}

			// Success - redirect to login
			goto('/login?reset=success');
		} catch (err) {
			error = 'An error occurred. Please try again.';
		} finally {
			loading = false;
		}
	}
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
			<h1 class="text-4xl font-bold text-gray-900 mb-2">Reset password</h1>
			<p class="text-slate-600">
				Enter your new password below.
			</p>
		</div>

		<!-- Error Message -->
		{#if error}
			<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
				<div class="flex items-start gap-3">
					<svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span class="text-sm text-red-800">{error}</span>
				</div>
			</div>
		{/if}

		<!-- Reset Password Form -->
		<form onsubmit={handleSubmit} class="space-y-6">
			<!-- Password Input -->
			<div>
				<label for="password" class="block text-sm font-medium text-gray-900 mb-2">
					New Password
				</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
					placeholder="••••••••"
					required
					disabled={loading || !token}
				/>
			</div>

			<!-- Confirm Password Input -->
			<div>
				<label for="confirm-password" class="block text-sm font-medium text-gray-900 mb-2">
					Confirm New Password
				</label>
				<input
					id="confirm-password"
					type="password"
					bind:value={confirmPassword}
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
					placeholder="••••••••"
					required
					disabled={loading || !token}
				/>
			</div>

			<!-- Reset Password Button -->
			<button
				type="submit"
				class="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={loading || !token}
			>
				{loading ? 'Resetting password...' : 'Reset password'}
			</button>
		</form>

		<!-- Back to login -->
		<div class="mt-8 text-center">
			<a href="/login" class="text-sm text-slate-600 hover:text-gray-900">
				← Back to login
			</a>
		</div>
	</div>
</div>
