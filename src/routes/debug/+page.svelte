<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="min-h-screen bg-white p-8">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-3xl font-bold text-gray-900 mb-6">Debug Info</h1>

		<div class="space-y-6">
			<div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
				<h2 class="text-xl font-bold text-gray-900 mb-3">Current URL</h2>
				<pre class="text-sm text-gray-700 overflow-auto">{data.url}</pre>
			</div>

			<div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
				<h2 class="text-xl font-bold text-gray-900 mb-3">Cookies</h2>
				<pre class="text-sm text-gray-700 overflow-auto">{JSON.stringify(data.cookies, null, 2)}</pre>
			</div>

			<div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
				<h2 class="text-xl font-bold text-gray-900 mb-3">Session ID</h2>
				<pre class="text-sm text-gray-700 overflow-auto">{data.sessionId || 'NO SESSION ID'}</pre>
			</div>

			<div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
				<h2 class="text-xl font-bold text-gray-900 mb-3">Session Data</h2>
				<pre class="text-sm text-gray-700 overflow-auto">{JSON.stringify(data.session, null, 2)}</pre>
			</div>

			<div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
				<h2 class="text-xl font-bold text-gray-900 mb-3">User Data</h2>
				<pre class="text-sm text-gray-700 overflow-auto">{JSON.stringify(data.user, null, 2)}</pre>
			</div>

			<div class="mt-6">
				<a href="/checkout?tier=pro" class="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800">
					Test Checkout Flow
				</a>
			</div>
		</div>
	</div>
</div>
