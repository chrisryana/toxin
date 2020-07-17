$('.filters__tongue').on('click', toggleFilters);

function toggleFilters(e) {
  e.preventDefault();
  $(e.currentTarget)
    .closest('.filters')
    .toggleClass('filters--visible')
}