import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';
// import '../simple-button/simple-button.scss'; // - если на странице не будет кнопок то и стили для кнопок календаря не подтянутся


const datepickerArea = $('.date-dropdown');
const inputs = $('.date-dropdown__input-wrapper');
const inputButtons = $('.date-dropdown__button');

const monthes = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

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
  inputs.eq(i).find('.date-dropdown__input').on('focus', function(e) {$(this).blur()});
}

const minDate = new Date();
const maxDate  = new Date();
maxDate.setFullYear(minDate.getFullYear() + 1);



const toggleDatepicker = (action) => {
  const datepicker = $(datepickerArea).find('.date-dropdown__datepicker');
  if (action === actions.open) {
    datepickerData.data('datepicker').show();
    datepicker.fadeIn(100);
    $(document).on('click', onOutsideCalendarClick);
  }
  if (action === actions.close) {
    datepickerData.data('datepicker').hide();
    datepicker.fadeOut(100);
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
  return `${DD}.${MM}.${YYYY}`;
}

const parsePeriod = (dates) => {
  const period = dates.map((date) => `${date.getDate()} ${monthes[date.getMonth()]}`);
  return period.join(' – ');
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
        const dpInputs = dp.$datepicker.closest('.date-dropdown').find('.date-dropdown__input');
        if (dpInputs.length === 2) {
          dp.selectedDates.forEach((date, index) => {
            const dateString = parseDate(date);
            dpInputs.eq(index).val(dateString);
          });
        } else if (dpInputs.length === 1) {
          const period = parsePeriod(dp.selectedDates);
          dpInputs.eq(0).val(period);
        }
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

const getDatesPeriod = (date) => {
  const period = date.split(' – ');
  const dates = period.map((datePeriod) => {
    const [day, month] = datePeriod.split(' ');
    const monthNumber = monthes.findIndex((monthWord) => month === monthWord);
    const currentDate = new Date();
    const selectDate = new Date(currentDate.getFullYear(), monthNumber, day);
    // чтобы если текущий месяц декабрь, была возможность вырать даты следующего года
    if (selectDate < currentDate) {
      selectDate.setFullYear(currentDate.getFullYear() + 1)
    }
    return selectDate;
  });
  return dates
}

const getDate = (dateString) => {
  const [DD, MM, YYYY] = dateString.split('.');
  return new Date(`${YYYY}-${MM}-${DD}`);
}

const readInputs = (dp) => {
  const dpInputs = dp.$datepicker.closest('.date-dropdown').find('.date-dropdown__input');
  const arrivalDate = dpInputs.eq(0).val();
  const departureDate = dpInputs.eq(1).val();
  if (arrivalDate || departureDate) {
    dpInputs.length === 2
      ? dp.selectDate([getDate(arrivalDate), getDate(departureDate)])
      : dp.selectDate(getDatesPeriod(arrivalDate));
  }
}

const onShow = (dp, animationCompleted) => {
  addApplyButton(dp, animationCompleted);
  readInputs(dp);
}

const datepickerData = datepickerArea.find('.date-dropdown__datepicker').datepicker({
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
  const datepicker = $(datepickerArea).find('.date-dropdown__datepicker');
  if (!datepicker || datepicker.is(":hidden")) {
    $(datepickerArea).append('<div class="date-dropdown__datepicker"></div>');
    toggleDatepicker(actions.open);
  }
});
