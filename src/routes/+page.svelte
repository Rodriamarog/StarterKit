<script lang="ts">
	const features = [
		{
			title: "Bring Your Own Framework",
			description: "Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.",
			icon: "bx:bxs-briefcase"
		},
		{
			title: "100% Static HTML, No JS",
			description: "Astro renders your entire page to static HTML, removing all JavaScript from your final build by default.",
			icon: "bx:bxs-window-alt"
		},
		{
			title: "On-Demand Components",
			description: "Need some JS? Astro can automatically hydrate interactive components when they become visible on the page.",
			icon: "bx:bxs-data"
		},
		{
			title: "Broad Integration",
			description: "Astro supports TypeScript, Scoped CSS, CSS Modules, Sass, Tailwind, Markdown, MDX, and any other npm packages.",
			icon: "bx:bxs-bot"
		},
		{
			title: "SEO Enabled",
			description: "Automatic sitemaps, RSS feeds, pagination and collections take the pain out of SEO and syndication. It just works!",
			icon: "bx:bxs-file-find"
		},
		{
			title: "Community",
			description: "Astro is an open source project powered by hundreds of contributors making thousands of individual contributions.",
			icon: "bx:bxs-user"
		}
	];

	const icons: Record<string, string> = {
		"bx:bxs-briefcase": '<path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-5-2v2H9V4h6zM8 8h12v3H4V8h4zm-4 9V13h5v2h6v-2h5v6H4v-2z"/>',
		"bx:bxs-window-alt": '<path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 2v3H4V5h16zM4 19v-9h16.001l.001 9H4z"/>',
		"bx:bxs-data": '<path d="M20 6c0-2.168-3.663-4-8-4S4 3.832 4 6v2c0 2.168 3.663 4 8 4s8-1.832 8-4V6zm-8 13c-4.337 0-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3c0 2.168-3.663 4-8 4z"/><path d="M20 10c0 2.168-3.663 4-8 4s-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3z"/>',
		"bx:bxs-bot": '<path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z"/>',
		"bx:bxs-file-find": '<path d="M6 22h12c.178 0 .348-.03.512-.074l-3.759-3.759A4.966 4.966 0 0 1 12 19c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5a4.964 4.964 0 0 1-.833 2.753l3.759 3.759c.044-.164.074-.334.074-.512V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/><circle cx="12" cy="14" r="3"/>',
		"bx:bxs-user": '<path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"/>'
	};
</script>

<div class="bg-white min-h-screen">
<div class="max-w-screen-xl mx-auto px-5">
	<!-- Navbar -->
	<header class="flex flex-col lg:flex-row justify-between items-center my-5">
		<div class="flex w-full lg:w-auto items-center justify-between">
			<a href="/" class="text-lg">
				<span class="font-bold text-slate-800">Astro</span><span class="text-slate-500">ship</span>
			</a>
		</div>
		<nav class="hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0">
			<ul class="flex flex-col lg:flex-row lg:gap-3">
				<li>
					<a href="#" class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900">
						Features
					</a>
				</li>
				<li>
					<a href="/pricing" class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900">
						Pricing
					</a>
				</li>
				<li>
					<a href="/about" class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900">
						About
					</a>
				</li>
				<li>
					<a href="/blog" class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900">
						Blog
					</a>
				</li>
				<li>
					<a href="/contact" class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900">
						Contact
					</a>
				</li>
			</ul>
		</nav>
		<div class="hidden lg:flex items-center gap-4">
			<a href="/login" class="text-gray-600 hover:text-gray-900">Log in</a>
			<a href="/register" class="px-5 py-2.5 text-center text-white bg-black rounded text-sm">
				Sign up
			</a>
		</div>
	</header>

	<!-- Hero -->
	<main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24">
		<div>
			<h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter text-gray-900">
				Recibe una alerta automática en cuanto aparezca una multa en tus placas de Tijuana.
			</h1>
			<p class="text-lg mt-4 text-slate-600 max-w-xl">
				Astroship is a starter template for startups, marketing websites & landing pages. Built with Astro.build and TailwindCSS. You can quickly create any website with this starter.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-3">
				<a href="https://web3templates.com/templates/astroship-starter-website-template-for-astro" target="_blank" rel="noopener" class="flex gap-1 items-center justify-center bg-black text-white px-6 py-3 rounded">
					<svg class="text-white w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M18.948 11.112C18.511 7.67 15.563 5 12.004 5c-2.756 0-5.15 1.611-6.243 4.15-2.148.642-3.757 2.67-3.757 4.85 0 2.757 2.243 5 5 5h1v-2h-1c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.757 2.673-3.016l.581-.102.192-.558C8.153 8.273 9.898 7 12.004 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-2v2h2c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z"/>
						<path d="M13.004 14v-4h-2v4h-3l4 5 4-5z"/>
					</svg>
					Download for Free
				</a>
				<a href="https://github.com/surjithctly/astroship" target="_blank" rel="noopener" class="flex gap-1 items-center justify-center border-2 border-black text-black px-6 py-3 rounded hover:bg-gray-50">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
					GitHub Repo
				</a>
			</div>
		</div>
		<div class="py-6 md:order-1 hidden md:block">
			<img
				src="/images/carguy.jpg"
				alt="Car guy"
				class="w-full h-auto"
				loading="eager"
			/>
		</div>
	</main>

	<!-- Features -->
	<div class="mt-16 md:mt-0">
		<h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight text-gray-900">
			Everything you need to start a website
		</h2>
		<p class="text-lg mt-4 text-slate-600">
			Astro comes batteries included. It takes the best parts of state-of-the-art tools and adds its own innovations.
		</p>
	</div>

	<div class="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
		{#each features as feature}
			<div class="flex gap-4 items-start">
				<div class="mt-1 bg-black rounded-full p-2 w-8 h-8 shrink-0">
					<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
						{@html icons[feature.icon]}
					</svg>
				</div>
				<div>
					<h3 class="font-semibold text-lg text-gray-900">{feature.title}</h3>
					<p class="text-slate-500 mt-2 leading-relaxed">{feature.description}</p>
				</div>
			</div>
		{/each}
	</div>

	<!-- Logos / Trust Badges -->
	<div class="mt-24">
		<h2 class="text-center text-slate-500">Works with your technologies</h2>
		<div class="flex gap-8 md:gap-20 items-center justify-center mt-10 flex-wrap">
			<!-- React -->
			<svg class="w-8 h-8 md:w-12 md:h-12 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
				<path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
			</svg>
			<!-- Svelte -->
			<svg class="w-8 h-8 md:w-12 md:h-12 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
				<path d="M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.109 4.109 0 0 1-.703-3.107 3.898 3.898 0 0 1 .134-.522l.105-.321.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063-.02.208a1.253 1.253 0 0 0 .226.83 1.337 1.337 0 0 0 1.435.533 1.231 1.231 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778 1.242 1.242 0 0 0-.211-.937 1.338 1.338 0 0 0-1.435-.533 1.23 1.23 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.108 4.108 0 0 1-.702-3.108 3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.499 4.44 4.44 0 0 1 4.765 1.767 4.109 4.109 0 0 1 .703 3.107 3.943 3.943 0 0 1-.134.522l-.105.321-.286-.21a7.204 7.204 0 0 0-2.187-1.091l-.208-.063.02-.209a1.255 1.255 0 0 0-.226-.829 1.338 1.338 0 0 0-1.435-.534 1.23 1.23 0 0 0-.343.15L8.62 9.368a1.162 1.162 0 0 0-.524.778 1.24 1.24 0 0 0 .211.937 1.338 1.338 0 0 0 1.435.533 1.235 1.235 0 0 0 .344-.15l2.131-1.36a4.08 4.08 0 0 1 1.136-.499 4.44 4.44 0 0 1 4.765 1.767 4.108 4.108 0 0 1 .702 3.107 3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.499z"/>
			</svg>
			<!-- Astro -->
			<svg class="w-8 h-8 md:w-12 md:h-12 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
				<path d="M16.074 16.86c-.72.616-2.157.769-3.567.769-1.938 0-4.011-.37-5.555-.916-.395-.14-.737-.332-1.01-.579-.063-.056-.115-.117-.159-.18l-.076-.092a1.013 1.013 0 0 1-.117-.13c-.064-.077-.113-.158-.145-.243l-.016-.043a1.003 1.003 0 0 1-.051-.233v-.016a.997.997 0 0 1 .013-.29l.006-.017.011-.025.02-.034c.075-.127.191-.24.344-.334.063-.039.13-.073.201-.104.13-.057.278-.105.442-.148.72-.191 1.708-.314 2.738-.314h.032c.762 0 1.513.069 2.181.194.26.048.502.105.726.17.095.028.186.058.274.09.362.131.669.295.907.494l.124.106c.047.04.089.083.128.126.13.144.227.306.282.489.007.027.014.055.02.083l.006.023c.004.022.008.043.009.065.006.05.009.1.009.15 0 .155-.024.31-.071.461l-.013.04c-.064.184-.164.355-.295.509a2.03 2.03 0 0 1-.339.305zm3.839-6.674c-.085 3.677-.816 6.698-2.19 9.028-.15.251-.309.494-.476.728a6.384 6.384 0 0 1-.612.73c-.299.315-.62.598-.957.851l-.13.096c-.434.314-.908.58-1.416.797a7.104 7.104 0 0 1-1.58.509c-.493.11-1.003.195-1.527.253a15.5 15.5 0 0 1-1.653.09h-.166c-.553 0-1.097-.027-1.633-.08a14.126 14.126 0 0 1-1.562-.212 9.84 9.84 0 0 1-1.476-.38 7.036 7.036 0 0 1-1.343-.629c-.36-.211-.699-.453-1.014-.727a6.27 6.27 0 0 1-.817-.858c-.073-.091-.142-.183-.21-.276a9.31 9.31 0 0 1-.475-.71 13.588 13.588 0 0 1-1.07-2.084 15.75 15.75 0 0 1-.689-2.251 17.862 17.862 0 0 1-.358-2.27c-.067-.73-.102-1.477-.102-2.238 0-2.308.36-4.547 1.053-6.678l.011-.034c.009-.024.018-.048.026-.072a1.015 1.015 0 0 1 .054-.117l.013-.022a.994.994 0 0 1 .096-.138l.01-.011a.982.982 0 0 1 .145-.126l.014-.01a1.004 1.004 0 0 1 .183-.095l.015-.006a.998.998 0 0 1 .204-.053l.017-.003a1.004 1.004 0 0 1 .223-.008l.02.002c.077.005.153.018.228.04l.025.007c.072.021.142.05.209.086l.021.012c.066.036.13.08.189.13l.014.012c.058.05.111.106.159.167l.011.015c.044.058.084.121.119.188l.008.016a1.01 1.01 0 0 1 .072.204v.011a1.018 1.018 0 0 1 .028.22v.022c0 .076-.008.151-.025.224l-.004.019a1.013 1.013 0 0 1-.059.2l-.007.016a1.016 1.016 0 0 1-.096.176l-.011.016a.996.996 0 0 1-.131.152l-.014.013a.985.985 0 0 1-.168.125l-.017.01a.995.995 0 0 1-.196.083l-.02.007a.993.993 0 0 1-.218.04h-.022a.996.996 0 0 1-.222-.012l-.02-.003a.995.995 0 0 1-.208-.053l-.018-.006a.998.998 0 0 1-.191-.09l-.016-.009c-.062-.038-.12-.083-.173-.134l-.012-.012a.991.991 0 0 1-.144-.168l-.009-.013a.996.996 0 0 1-.107-.206l-.005-.014a1.003 1.003 0 0 1-.053-.22v-.02a1.006 1.006 0 0 1 .009-.227l.003-.017c.012-.073.031-.144.058-.213l.006-.017c.027-.068.061-.134.1-.197l.009-.014c.04-.062.086-.121.136-.176l.012-.013c.051-.055.107-.105.167-.15l.014-.01c.06-.044.124-.083.191-.115l.016-.008a.997.997 0 0 1 .206-.069l.018-.004a1.002 1.002 0 0 1 .221-.024h.021c.076 0 .152.009.225.026l.018.005c.072.018.142.045.209.078l.017.009c.066.034.129.075.187.121l.014.011c.058.047.111.1.159.157l.011.014c.046.057.087.119.122.185l.008.015c.033.065.06.134.082.205l.005.016c.02.071.034.143.043.217l.002.019c.007.074.009.149.005.223v.021a1.01 1.01 0 0 1-.033.217l-.005.018a.999.999 0 0 1-.07.202l-.008.016a1.003 1.003 0 0 1-.108.183l-.01.014a.997.997 0 0 1-.144.159l-.013.011a.985.985 0 0 1-.179.123l-.016.009a.998.998 0 0 1-.206.08l-.019.005a.998.998 0 0 1-.221.029h-.021c-.076 0-.152-.01-.225-.029l-.019-.006a.996.996 0 0 1-.206-.076l-.017-.008a.995.995 0 0 1-.186-.117l-.015-.011a.997.997 0 0 1-.161-.155l-.011-.013a.998.998 0 0 1-.125-.191l-.007-.014a1.0 1.0 0 0 1-.076-.211l-.004-.018a1.004 1.004 0 0 1-.024-.222v-.021c0-.076.011-.152.032-.225l.006-.018c.021-.072.052-.141.09-.206l.01-.016c.038-.065.083-.126.134-.182l.013-.014c.051-.056.108-.107.17-.152l.015-.01c.061-.045.127-.084.196-.117l.017-.008c.069-.032.141-.058.215-.077l.019-.005a1.006 1.006 0 0 1 .225-.025h.021c.077 0 .153.011.227.032l.018.006c.073.022.144.053.211.091l.016.01c.067.039.131.085.19.137l.014.013c.058.051.112.108.16.169l.011.015c.046.06.087.124.122.192l.008.016c.033.067.06.138.08.21l.005.018c.019.072.031.146.037.22l.001.02c.004.076-.001.151-.016.226l-.004.019a.997.997 0 0 1-.056.211l-.007.017a1.0 1.0 0 0 1-.095.194l-.009.015a.998.998 0 0 1-.134.171l-.012.013a.996.996 0 0 1-.172.144l-.015.01a.997.997 0 0 1-.202.097l-.018.007a.999.999 0 0 1-.218.046h-.021a1.001 1.001 0 0 1-.226-.016l-.019-.004a.998.998 0 0 1-.212-.067l-.017-.008a.997.997 0 0 1-.195-.108l-.014-.01a.997.997 0 0 1-.168-.149l-.011-.013a.998.998 0 0 1-.136-.186l-.008-.014a1.0 1.0 0 0 1-.09-.208l-.005-.017a1.003 1.003 0 0 1-.036-.222v-.021c0-.076.013-.151.038-.223l.007-.019c.025-.071.059-.139.1-.203l.011-.016c.041-.064.089-.124.143-.178l.014-.014c.054-.054.113-.103.177-.146l.016-.01c.064-.042.132-.078.203-.107l.018-.008a1.0 1.0 0 0 1 .218-.057l.019-.003a1.004 1.004 0 0 1 .226-.004l.02.003c.075.011.148.03.219.057l.018.007c.07.028.138.063.202.104l.016.01c.064.042.124.09.178.144l.014.013c.054.054.104.113.148.177l.01.015c.043.064.079.132.109.203l.007.018c.029.071.051.145.065.22l.003.019c.013.075.019.151.017.227v.021a1.01 1.01 0 0 1-.03.224l-.006.019a.999.999 0 0 1-.075.208l-.008.017a1.001 1.001 0 0 1-.116.191l-.01.014a.998.998 0 0 1-.154.166l-.013.012a.996.996 0 0 1-.187.132l-.016.009a.997.997 0 0 1-.209.088l-.019.006a1.0 1.0 0 0 1-.223.035h-.021a1.004 1.004 0 0 1-.226-.021l-.019-.005a.998.998 0 0 1-.213-.074l-.017-.008a.997.997 0 0 1-.196-.117l-.015-.011a.997.997 0 0 1-.164-.158l-.011-.014a.998.998 0 0 1-.13-.193l-.007-.015a1.0 1.0 0 0 1-.084-.213l-.004-.018a1.004 1.004 0 0 1-.028-.223v-.021c0-.076.015-.151.044-.222l.008-.019c.029-.07.066-.137.11-.2l.012-.016c.044-.063.095-.121.151-.174l.014-.013c.057-.052.119-.099.185-.14l.017-.01c.066-.04.136-.074.209-.101l.018-.007a1.0 1.0 0 0 1 .22-.048l.02-.002a1.006 1.006 0 0 1 .226.003l.02.004c.074.014.147.036.217.065l.018.008c.069.029.136.066.199.108l.016.011c.063.043.122.092.176.147l.014.014c.053.055.102.115.145.179l.01.016c.042.064.077.132.105.203l.007.018c.027.071.047.144.06.219l.003.019c.012.075.017.151.014.227v.021a1.01 1.01 0 0 1-.034.224l-.007.019a.999.999 0 0 1-.079.207l-.009.017a1.001 1.001 0 0 1-.121.189l-.011.014a.998.998 0 0 1-.159.163l-.014.012a.996.996 0 0 1-.192.127l-.017.009a.997.997 0 0 1-.212.082l-.019.005a1.0 1.0 0 0 1-.224.031h-.021a1.004 1.004 0 0 1-.225-.025l-.019-.006a.998.998 0 0 1-.212-.08l-.017-.009a.997.997 0 0 1-.193-.125l-.015-.012a.997.997 0 0 1-.159-.163l-.011-.014a.998.998 0 0 1-.121-.189l-.008-.017a1.0 1.0 0 0 1-.078-.207l-.006-.019a1.01 1.01 0 0 1-.031-.224v-.021c0-.076.017-.151.049-.222l.009-.019c.032-.07.072-.136.119-.197l.013-.016c.047-.061.1-.118.159-.17l.015-.013c.059-.051.123-.096.191-.135l.017-.009c.068-.039.14-.071.214-.096l.019-.007a1.0 1.0 0 0 1 .221-.041l.02-.001a1.006 1.006 0 0 1 .226.009l.019.005c.075.016.148.041.217.073l.018.009c.068.032.134.071.196.115l.016.012c.062.045.12.095.173.15l.014.014c.052.056.1.117.142.182l.01.016c.041.065.075.134.102.206l.007.018c.026.072.045.146.056.221l.002.019c.01.075.014.151.01.227v.021a1.01 1.01 0 0 1-.039.223l-.007.019a.999.999 0 0 1-.084.205l-.009.017a1.001 1.001 0 0 1-.127.186l-.012.014a.998.998 0 0 1-.165.158l-.014.011a.996.996 0 0 1-.197.121l-.018.009a.997.997 0 0 1-.215.076l-.019.004a1.0 1.0 0 0 1-.225.026h-.021a1.004 1.004 0 0 1-.225-.03l-.019-.007a.998.998 0 0 1-.211-.087l-.017-.01a.997.997 0 0 1-.188-.132l-.015-.013a.997.997 0 0 1-.154-.166l-.01-.014a.998.998 0 0 1-.116-.191l-.008-.017a1.0 1.0 0 0 1-.075-.208l-.006-.019a1.01 1.01 0 0 1-.027-.224v-.021c0-.076.019-.151.054-.221l.01-.019c.035-.069.078-.134.128-.194l.013-.016c.05-.059.106-.114.167-.164l.016-.013c.061-.049.127-.092.197-.129l.018-.009c.07-.036.143-.066.218-.089l.019-.006a1.0 1.0 0 0 1 .222-.035l.02-.001a1.006 1.006 0 0 1 .226.015l.019.005c.075.019.148.046.218.081l.018.01c.068.035.133.077.193.125l.016.013c.061.048.117.101.169.159l.014.015c.051.058.097.12.137.186l.01.017c.039.066.072.136.098.208l.007.019c.025.073.042.147.052.223l.002.019c.009.076.011.152.006.227v.021a1.01 1.01 0 0 1-.043.222l-.008.019a.999.999 0 0 1-.089.203l-.010.017a1.001 1.001 0 0 1-.132.183l-.013.014a.998.998 0 0 1-.171.153l-.015.011a.996.996 0 0 1-.201.116l-.019.008a.997.997 0 0 1-.218.070l-.019.004a1.0 1.0 0 0 1-.225.021h-.021z"/>
			</svg>
			<!-- Tailwind -->
			<svg class="w-8 h-12 md:w-12 md:h-16 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
			</svg>
			<!-- Alpine.js -->
			<svg class="w-8 h-12 md:w-12 md:h-16 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
				<path d="M24 12 12 24 0 12h24zM0 0h24L12 12 0 0z"/>
			</svg>
			<!-- Vercel -->
			<svg class="w-8 h-8 md:w-12 md:h-12 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
				<path d="m12 1 12 21H0L12 1z"/>
			</svg>
		</div>
	</div>

	<!-- Pricing -->
	<div class="mt-24">
		<div class="text-center mb-16">
			<h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight text-gray-900">
				Simple, transparent pricing
			</h2>
			<p class="text-lg mt-4 text-slate-600">
				Choose the plan that works best for you
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
			<!-- Free Plan -->
			<div class="border-2 border-gray-200 rounded-lg p-8 bg-white hover:border-gray-300 transition-colors">
				<h3 class="text-2xl font-bold text-gray-900 mb-2">Free</h3>
				<div class="mb-6">
					<span class="text-4xl font-bold text-gray-900">$0</span>
					<span class="text-slate-600">/month</span>
				</div>
				<p class="text-slate-600 mb-6">Perfect for getting started</p>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Up to 5 fines tracked</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Email reminders</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">1 license plate</span>
					</li>
				</ul>
				<a href="/register" class="block w-full text-center px-6 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-gray-50 transition-colors">
					Get started
				</a>
			</div>

			<!-- Pro Plan -->
			<div class="border-2 border-black rounded-lg p-8 bg-white relative">
				<div class="absolute -top-4 left-1/2 -translate-x-1/2">
					<span class="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
						Popular
					</span>
				</div>
				<h3 class="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
				<div class="mb-6">
					<span class="text-4xl font-bold text-gray-900">$200 MXN</span>
					<span class="text-slate-600">/month</span>
				</div>
				<p class="text-slate-600 mb-6">For individuals and families</p>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Unlimited fines tracked</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Priority email reminders</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Up to 5 license plates</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Export data</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Payment tracking</span>
					</li>
				</ul>
				<a href="/checkout?tier=pro" class="block w-full text-center px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
					Subscribe now
				</a>
			</div>

			<!-- Business Plan -->
			<div class="border-2 border-gray-200 rounded-lg p-8 bg-white hover:border-gray-300 transition-colors">
				<h3 class="text-2xl font-bold text-gray-900 mb-2">Business</h3>
				<div class="mb-6">
					<span class="text-4xl font-bold text-gray-900">$600 MXN</span>
					<span class="text-slate-600">/month</span>
				</div>
				<p class="text-slate-600 mb-6">For fleets and businesses</p>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Everything in Pro</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Unlimited license plates</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Team collaboration</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Advanced reporting</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-slate-600">Priority support</span>
					</li>
				</ul>
				<a href="/checkout?tier=business" class="block w-full text-center px-6 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-gray-50 transition-colors">
					Subscribe now
				</a>
			</div>
		</div>
	</div>

	<!-- CTA -->
	<div class="bg-black p-8 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
		<h2 class="text-white text-4xl md:text-6xl tracking-tight">
			Build faster websites.
		</h2>
		<p class="text-slate-400 mt-4 text-lg md:text-xl">
			Pull content from anywhere and serve it fast with Astro's next-gen island architecture.
		</p>
		<div class="flex mt-5">
			<a href="#" class="px-6 py-3 text-center bg-white text-black rounded">
				Get Started
			</a>
		</div>
	</div>
</div>

<!-- Footer -->
<footer class="my-20 bg-white">
	<p class="text-center text-sm text-slate-500">
		Copyright © 2024 Astroship. All rights reserved.
	</p>
	<p class="text-center text-xs text-slate-500 mt-1">
		Made by <a href="https://web3templates.com" target="_blank" rel="noopener" class="hover:underline">
			Web3Templates
		</a>
	</p>
</footer>
</div>
