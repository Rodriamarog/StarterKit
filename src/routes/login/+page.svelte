<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);
	let resetSuccess = $state(false);

	// Check if redirected from password reset
	$effect(() => {
		if ($page.url.searchParams.get('reset') === 'success') {
			resetSuccess = true;
		}
	});

	async function handleSubmit() {
		error = '';
		loading = true;

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Login failed';
				return;
			}

			// Login successful, check for redirect parameter
			const redirectTo = $page.url.searchParams.get('redirect');
			goto(redirectTo || '/dashboard');
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
			<h1 class="text-4xl font-bold text-gray-900 mb-2">Sign in</h1>
			<p class="text-slate-600">
				Don't have an account?
				<a href="/register" class="text-gray-900 hover:underline font-medium">Sign up</a>
			</p>
		</div>

		<!-- Success Message -->
		{#if resetSuccess}
			<div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
				<div class="flex items-start gap-3">
					<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<div>
						<h3 class="text-sm font-medium text-green-800">Password reset successful!</h3>
						<p class="text-xs text-green-700 mt-1">
							You can now sign in with your new password.
						</p>
					</div>
				</div>
			</div>
		{/if}

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

		<!-- Login Form -->
		<form onsubmit={handleSubmit} class="space-y-6">
			<!-- Email Input -->
			<div>
				<label for="email" class="block text-sm font-medium text-gray-900 mb-2">
					Email address
				</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
					placeholder="you@example.com"
					required
					disabled={loading}
				/>
			</div>

			<!-- Password Input -->
			<div>
				<div class="flex items-center justify-between mb-2">
					<label for="password" class="block text-sm font-medium text-gray-900">
						Password
					</label>
					<a href="/forgot-password" class="text-sm text-slate-600 hover:text-gray-900">
						Forgot password?
					</a>
				</div>
				<input
					id="password"
					type="password"
					bind:value={password}
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
					placeholder="••••••••"
					required
					disabled={loading}
				/>
			</div>

			<!-- Sign In Button -->
			<button
				type="submit"
				class="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={loading}
			>
				{loading ? 'Signing in...' : 'Sign in'}
			</button>
		</form>

		<!-- Back to home -->
		<div class="mt-8 text-center">
			<a href="/" class="text-sm text-slate-600 hover:text-gray-900">
				← Back to home
			</a>
		</div>
	</div>
</div>
