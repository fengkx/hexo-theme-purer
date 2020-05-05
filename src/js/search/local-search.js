const searchApp = new Yox({
  el: '#search-view-container',
  template: '#search-teamplate',
  data: {
    posts: [],
    keyword: '',
  },
  async afterCreate() {
    const path = document
      .getElementById('search-teamplate')
      .getAttribute('data-path');
    const resp = await fetch(path);
    const data = await resp.json();
    this.set('posts', data.posts);
  },
  computed: {
    searchPosts() {
      const posts = this.get('posts');
      const kw = this.get('keyword');
      const result = posts
        .filter((p) => p.title.includes(kw) || p.text.includes(kw))
        .map((p) => {
          const r = { ...p };
          r.text = `${p.text.substring(0, 100)}...`;
          return r;
        });
      return result;
    },
  },
});
