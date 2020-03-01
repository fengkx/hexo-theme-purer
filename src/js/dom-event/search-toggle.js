const $mask = document.getElementById('mask');
const $searchViewContainer = document.getElementById('search-view-container');
const $searchForm = document.getElementById('search-form');

$searchForm.addEventListener('click', () => {
  $mask.classList.toggle('hidden');
  $searchViewContainer.classList.toggle('hidden');
});

$mask.addEventListener('click', () => {
  $mask.classList.toggle('hidden');
  $searchViewContainer.classList.toggle('hidden');
});
