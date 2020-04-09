[...document.querySelectorAll('article img')]
  .filter((n) => n.style.display !== 'none' && !n.parentElement.classList.contains('panel-body'))
  .forEach((img) => {
    const imageCaption = img.getAttribute('alt');
    let imageWrapLink = img.parentNode;
    while (imageWrapLink && (imageWrapLink !== document.body)
        && (imageWrapLink.tagName !== 'A' && !imageWrapLink.href)) {
      imageWrapLink = imageWrapLink.parentElement;
    } // search up to document.body
    if (imageWrapLink === document.body) {
      let src = img.getAttribute('src');
      const u = new URL(src);
      const matches = u.search.match(/url=(.+)&*/);
      if (matches && matches[1]) {
        // eslint-disable-next-line prefer-destructuring
        src = matches[1];
      }
      const wraper = document.createElement('div');
      wraper.classList.add('image');
      wraper.setAttribute('data-src', src);
      img.parentNode.insertBefore(wraper, img);
      wraper.appendChild(img);
      imageWrapLink = wraper;
      wraper.setAttribute('data-caption', imageCaption);
    }
  });
lightGallery(document.querySelector('main'), {
  selector: '.image',
  zoom: true,
  fullScreen: true,
});
