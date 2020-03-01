const repoApp = new Yox({
  el: '#repo-root',
  template: '#repo-template',
  data: {
    loading: true,
    github_repos: [],
  },
  async afterCreate() {
    const username = document.getElementById('github-username').textContent;
    const resp = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const data = await resp.json();
    document.getElementById('repo-count').textContent = data.length < 50 ? data.length : `at least ${data.length}`;
    this.set({
      loading: false,
      github_repos: data,
    });
  },
  computed: {
    repos_sorted() {
      return this.get('github_repos')
        .sort((a, b) => {
          let astart = a.stargazers_count;
          let bstart = b.stargazers_count;
          if (a.fork) astart *= 0.5;
          if (b.fork) bstart *= 0.5;
          return bstart - astart;
        });
    },
  },
});
