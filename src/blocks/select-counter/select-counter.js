const selects = $('.select-counter');

selects.on('click', showDropdown);

for (let i = 0; i < selects.length; i++) {
  selects
    .eq(i)
    .find('.form-group__input')
    .on('focus', function(e) {$(this).blur()});
}

function hideDropdown(e) {
  if (!$(e.target).closest('.select-counter').length) {
    selects.removeClass('select-counter--expanded');
    $(document).off('click', hideDropdown);
  }
}

function showDropdown(e) {
  if (!$(this).hasClass('select-counter--expanded')) {
    $(this).addClass('select-counter--expanded');
    $(document).on('click', hideDropdown);
    $(this).find('.select-counter__item-button').on('click', handleChangeCount);
    $(this).find('.simple-button--secondary').on('click', clearValues)
  }
}

function handleChangeCount(e) {
  let value = $(this).siblings('.select-counter__item-count').text();
  if ($(this).attr('data-action') === 'asc') {
    value = Number(value) + 1;
    $(this).prop('disabled', !!(value >= 5));
    $(this).siblings('.select-counter__item-button').prop('disabled', value === 0);
  }
  if ($(this).attr('data-action') === 'desc') {
    value = Number(value) - 1;
    $(this).prop('disabled', !!(value === 0));
    $(this).siblings('.select-counter__item-button').prop('disabled', !!(value >= 5));
  }
  $(this).siblings('.select-counter__item-count').text(value);
}

function clearValues(e) {
  const counterList = $(this).parents('.select-counter__items-footer').siblings('.select-counter__items-list');
  counterList.find('.select-counter__item-count').text(0);
  counterList.find('.select-counter__item-button[data-action="desc"]').prop('disabled', true);
  $(this).parent().addClass('select-counter__footer-button--hide')
}