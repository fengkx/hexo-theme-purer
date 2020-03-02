const $mask = document.getElementById('mask');
const $searchViewContainer = document.getElementById('search-view-container');
const $searchForm = document.getElementById('search-form');

$searchForm.addEventListener('click', () => {
  $mask.classList.remove('hidden');
  $searchViewContainer.classList.remove('hidden');
  const $actualSearchInput = document.getElementById('actual-search-input');
  $actualSearchInput.focus();
});

$mask.addEventListener('click', () => {
  $mask.classList.toggle('hidden');
  $searchViewContainer.classList.toggle('hidden');
});
