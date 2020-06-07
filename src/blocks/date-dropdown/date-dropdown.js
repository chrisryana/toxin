import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';


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
    const dpFooter = dp.$datepicker.find('.datepicker--buttons');
    const applyButton = dp.$datepicker.find('.datepicker--button-primary');
    if (!applyButton.html()) {
      dpFooter.append('<button type="button" class="datepicker--button datepicker--button-primary" disabled="true">Применить</button>')
      dp.$datepicker.find('.datepicker--button-primary').on('click', (event) => {
        dp.selectedDates.forEach((date, index) => {
          const dateString = parseDate(date);
          inputs.eq(index).find('.date-dropdown__input').val(dateString);
        });
        toggleDatepicker(actions.close);
      });
    }
  }
}

const toggleApplyButton = (formattedDate, date, dp) => {
  const applyButton = dp.$datepicker.find('.datepicker--button-primary');
  if (formattedDate.split(',').length === 2) {
    applyButton.prop('disabled', false);
  } else {
    applyButton.prop('disabled', true);
  }
}

const readInputs = (dp) => {
  const arrivalDate = inputs.eq(0).find('.date-dropdown__input').val();
  const departureDate = inputs.eq(1).find('.date-dropdown__input').val();
  if (arrivalDate || departureDate) {
    dp.selectDate([new Date(arrivalDate), new Date(departureDate)])
  }
}

const onChangeView = () => {
  datepickerData.data('datepicker').view = 'days';
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
  clearButton: true,
  prevHtml: '<span class="material-icons">arrow_back</span>',
  nextHtml: '<span class="material-icons">arrow_forward</span>',
  navTitles: {days: 'MM yyyy',},
  onRenderCell,
  onShow,
  onSelect: toggleApplyButton,
  onChangeView,
});

toggleDatepicker(actions.close);

inputs.on('click', (e) => {
  e.preventDefault();
  if (datepickerArea.is(":hidden")) {
    toggleDatepicker(actions.open)
  }
});
