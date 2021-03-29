<script lang="ts">
	import { onMount } from 'svelte';
	const el = document.getElementById('content-json');
	const placeholder = el.getAttribute('data-placeholder')
	const jsonPath = el.textContent;
	let posts = [];
	let keyword = '';
	const fetchData = async (jsonPath) => {
		const resp = await fetch(jsonPath);
		const data = await resp.json();
		return data.posts;
	}

	onMount(async () => {
		posts = await fetchData(jsonPath);
	})

	$: searchPosts = posts
			.filter((p) => p.title.includes(keyword) || p.text.includes(keyword))
			.map((p) => {
				const r = { ...p };
				// r.text = `${p.text.substring(0, 100)}...`;
				return r;
			});
</script>
<div>
	<div class="search-header bg-gray-400">
		<input id="actual-search-input" model="keyword" ref="input" class="inline-block w-full h-10 px-2 py-1" placeholder="{placeholder}" type="text" bind:value={keyword} >
	</div>
	<div class="search-result bg-gray-200">
		{#each searchPosts as post}
		<a href="/{ post.path }" class="result-item block px-2 pb-3 mb-1 pt-1 hover:bg-indigo-100">
			<i class="iconfont icon-file"></i>
			<h1 class="result-title inline font-medium text-lg">{ post.title }</h1>
			<p class="result-content line-clamp-4 text-gray-600 text-sm">{ post.text }</p>
		</a>
		{/each}
	</div>
</div>
