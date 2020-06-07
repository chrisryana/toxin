import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';
// import '../simple-button/simple-button.scss'; // - если на странице не будет кнопок то и стили для кнопок календаря не подтянутся


const datepickerArea = $('.date-dropdown__datepicker');
const inputs = $('.date-dropdown__input-wrapper');
const inputButtons = $('.date-dropdown__button');

const actions = {
  close: 'close',
  open: 'open'
};

inputButtons.on('keydown', (e) => {
  if (e.keyCode === 13 && datepickerArea.is(":hidden")) {
    toggleDatepicker(actions.open);
  }
})

$(document).on('keydown', (e) => {
  if (e.keyCode === 27 && datepickerArea.is(":visible")) {
    toggleDatepicker(actions.close);
  }
})

for (let i = 0; i < inputs.length; i++) {
  inputs.eq(i).find('.date-dropdown__input').prop('disabled', true);
}

const minDate = new Date();
const maxDate  = new Date();
maxDate.setFullYear(minDate.getFullYear() + 1);



const toggleDatepicker = (action) => {
  if (action === actions.open) {
    datepickerData.data('datepicker').show();
    datepickerArea.fadeIn(100);
    $(document).on('click', onOutsideCalendarClick);
  }
  if (action === actions.close) {
    datepickerData.data('datepicker').hide();
    datepickerArea.fadeOut(100);
    $(document).off('click', onOutsideCalendarClick);
  }
}

const onOutsideCalendarClick = (e) => {
  const isDatepickerClick = !!$(e.target).closest('.date-dropdown__datepicker').length;
  const isDatepickerInputClick = !!$(e.target).closest('.date-dropdown__input-wrapper').length;
  const isDatepickerNav = !!$(e.target).closest('.datepicker--nav').length;
  const isDatepickerNavAction = !!$(e.target).closest('.datepicker--nav-action').length;
  const isDatepickerDays = !!$(e.target).closest('.datepicker--cell').length;
  const isDatepickerArea = isDatepickerClick || isDatepickerInputClick || isDatepickerNav || isDatepickerDays || isDatepickerNavAction;

  if (!isDatepickerArea) {
    toggleDatepicker(actions.close);
  }
}

const onRenderCell = (date, cellType) => {
  if (cellType == 'day') {
    const currentDate = date.getDate();
    return {
      html: `<span class="datepicker--cell-circle">${currentDate}</span>`
    }
  }
}

const parseDate = (date) => {
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const DD = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${YYYY}-${MM}-${DD}`;
}

const addApplyButton = (dp, animationCompleted) => {
  if (!animationCompleted) {
    if (!dp.$datepicker.find('.datepicker--footer').html()) {
      const isDisabledApplyButton = dp.selectedDates.length < 2;
      const isDisabledClearButton = dp.selectedDates.length === 0;
      const clearButton = `<button class="simple-button simple-button--secondary" data-action="clear" type="button" disabled=${isDisabledClearButton}>Очистить</button>`;
      const applyButton = `<button class="simple-button simple-button--primary" data-action="apply" type="button" disabled=${isDisabledApplyButton}>Применить</button>`;
      const footer = `<div class="datepicker--footer">${clearButton}${applyButton}</div>`
      dp.$datepicker.append(footer);

      dp.$datepicker.find('.simple-button--primary[data-action="apply"]').on('click', (event) => {
        dp.selectedDates.forEach((date, index) => {
          const dateString = parseDate(date);
          inputs.eq(index).find('.date-dropdown__input').val(dateString);
        });
        toggleDatepicker(actions.close);
      });

      dp.$datepicker.find('.simple-button--secondary[data-action="clear"]').on('click', (event) => {
        dp.clear();
      });
    }
  }
}

const toggleButtonsState = (formattedDate, date, dp) => {
  const applyButton = dp.$datepicker.find('.simple-button--primary[data-action="apply"]');
  const clearButton = dp.$datepicker.find('.simple-button--secondary[data-action="clear"]');

  if (dp.selectedDates.length === 2) {
    applyButton.prop('disabled', false);
  } else {
    applyButton.prop('disabled', true);
  }

  if (dp.selectedDates.length === 0) {
    clearButton.prop('disabled', true);
  } else {
    clearButton.prop('disabled', false);
  }
}

const readInputs = (dp) => {
  const arrivalDate = inputs.eq(0).find('.date-dropdown__input').val();
  const departureDate = inputs.eq(1).find('.date-dropdown__input').val();
  if (arrivalDate || departureDate) {
    dp.selectDate([new Date(arrivalDate), new Date(departureDate)])
  }
}

const onShow = (dp, animationCompleted) => {
  addApplyButton(dp, animationCompleted);
  readInputs(dp);
}

const datepickerData = datepickerArea.datepicker({
  view: 'days',
  range: true,
  minDate,
  maxDate,
  prevHtml: '<span class="material-icons">arrow_back</span>',
  nextHtml: '<span class="material-icons">arrow_forward</span>',
  navTitles: {days: 'MM yyyy',},
  onRenderCell,
  onShow,
  onSelect: toggleButtonsState,
});

toggleDatepicker(actions.close);

inputs.on('click', (e) => {
  e.preventDefault();
  if (datepickerArea.is(":hidden")) {
    toggleDatepicker(actions.open)
  }
});
