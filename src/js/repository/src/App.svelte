<script lang="ts">
	import { onMount } from 'svelte';
	let username: string;
	let data = [];

	const getData = async (username) => {
		const resp = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
		const data = await resp.json();
		if (resp.ok) {
			return data.sort((a, b) => {
				let astart = a.stargazers_count;
				let bstart = b.stargazers_count;
				if (a.fork) astart *= 0.5;
				if (b.fork) bstart *= 0.5;
				return bstart - astart;
			});
		} else {
			throw new Error('Cannot get data from GitHub API')
		}
	}
	onMount(async () => {
		username = document.getElementById('github-username').textContent;
		data = await getData(username);
		document.getElementById('repo-count').textContent = data.length < 50 ? data.length : `at least ${data.length}`;
	})
</script>

<div>
	<div class="repos">
		{#each data as repo (repo.id) }
			<div v-for="repo in repos_sorted" key="{repo.id}" class="repo">
				<header>
					<h3 class="repo-title">
						<a href="{ repo.html_url }">{repo.full_name}</a>
					</h3>
				</header>
				<p class="repo-body">
					{ repo.description ?? '' }
				</p>
				<div class="repo-meta">
					<div class="repo-meta-inner">
						<span class="repo-lang">{ repo.language ?? '' }</span>
						<span class="repo-star"><i class="iconfont icon-star"></i> { repo.stargazers_count }</span>
						<span class="repo-fork"><i class="iconfont icon-code-fork"></i> { repo.forks_count }</span>
						<span class="meta meta-last-updated">
                        <i class="icon icon-clock"></i>
                        <time datetime="repo.updated_at">{ repo.updated_at.substring(0, repo.updated_at.lastIndexOf("T")) }</time>
                    </span>
					</div>
				</div>
			</div>
		{:else}
			<p v-if="loading">Loading...</p>
		{/each}
	</div>
</div>
