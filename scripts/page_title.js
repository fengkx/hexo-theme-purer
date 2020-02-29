hexo.extend.helper.register('page_title', function(pg = null) {
  const page = (pg !== null) ? pg : this.page;
  let title = page.title;
  if (this.is_archive()) {
    title = this.__('archive');
    if (this.is_month()) {
      title += `: ${page.year}/${page.month}`;
    } else if (this.is_year()) {
      title += `: ${page.year}`;
    }
  } else if (this.is_category()) {
    title = this.__('page.category') + `: ${page.category}`;
  } else if (this.is_tag()) {
    title = this.__('page.tag') + `: ${page.tag}`
  }
  title = [title, hexo.config.title].filter((str) => typeof (str) !== 'undefined' && str.trim() !== '').join(' | ');
  return title;
});
