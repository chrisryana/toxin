const $dropdowns = $('.js-date-dropdown');
[...$dropdowns].forEach((dropdown) => {initCalendarToggler(dropdown)});


function initCalendarToggler(datepickerArea) {
  const actions = { close: 'close', open: 'open'};

  const $inputs = $(datepickerArea).find('.date-dropdown__input-wrapper');
  const $inputButtons = $(datepickerArea).find('.date-dropdown__button');

  $inputButtons.on('keydown', (e) => {
    if (e.keyCode === 13 && $(datepickerArea).is(':hidden')) {
      toggleDatepicker(actions.open);
    }
  })
  
  $(document).on('keydown', (e) => {
    if (e.keyCode === 27 && $(datepickerArea).is(':visible')) {
      toggleDatepicker(actions.close);
    }
  })
  
  for (let i = 0; i < $inputs.length; i++) {
    $($inputs).eq(i).find('.date-dropdown__input').on('focus', function(e) {$(e.currentTarget).blur()});
  }

  const toggleDatepicker = (action) => {
    const $datepicker = $(datepickerArea).find('.calendar');
    if (action === actions.open) {
      $datepicker.fadeIn(100);
      $(document).on('click', onOutsideCalendarClick);
    }
    if (action === actions.close) {
      $datepicker.fadeOut(100);
      $(document).off('click', onOutsideCalendarClick);
    }
  }
  
  const onOutsideCalendarClick = (e) => {
    // если closest('.date-dropdown) то календарь закрывается по клику на данные элементы
    const isDatepickerClick = !!$(e.target).closest('.date-dropdown__datepicker').length;
    const isDatepickerInputClick = !!$(e.target).closest('.date-dropdown__input-wrapper').length;
    const isDatepickerNav = !!$(e.target).closest('.datepicker--nav').length;
    const isDatepickerNavAction = !!$(e.target).closest('.datepicker--nav-action').length;
    const isDatepickerDays = !!$(e.target).closest('.datepicker--cell').length;
    const isDatepickerArea = isDatepickerClick || isDatepickerInputClick || isDatepickerNav || isDatepickerDays || isDatepickerNavAction;
  
    if (!$(datepickerArea).is(e.target) && $(datepickerArea).has(e.target).length === 0 && !isDatepickerArea) {
      toggleDatepicker(actions.close);
    }
  }
  
  toggleDatepicker(actions.close);
  
  $inputs.on('click', (e) => {
    e.preventDefault();
    const $datepicker = $(datepickerArea).find('.calendar');

    if (!$datepicker || $($datepicker).is(':hidden')) {
      toggleDatepicker(actions.open);
    }
  });

  $(datepickerArea).find('.simple-button--primary[data-action="apply"]').on('click', () => {
    toggleDatepicker(actions.close);
  })
}
