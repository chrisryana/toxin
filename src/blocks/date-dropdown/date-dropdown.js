import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';


const datepickerArea = $('.date-dropdown__datepicker');
const input = $('.date-dropdown__input-wrapper');

const minDate = new Date();
const maxDate  = new Date();
maxDate.setFullYear(minDate.getFullYear() + 1);

const onRenderCell = (date, cellType) => {
  if (cellType == 'day') {
    const currentDate = date.getDate();
    return {
      html: `<span class="datepicker--cell-circle">${currentDate}</span>`
    }
  }
}

const addApplyButton = (dp, animationCompleted) => {
  if (!animationCompleted) {
    const dpFooter = dp.$datepicker.find('.datepicker--buttons');
    const applyButton = dp.$datepicker.find('.datepicker--button-primary');
    if (!applyButton.html()) {
      dpFooter.append('<button type="button" class="datepicker--button datepicker--button-primary" disabled="true">Применить</button>')
      dp.$datepicker.find('.datepicker--button-primary').on('click', (event) => {
        dp.$datepicker.hide();
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

const object = datepickerArea.datepicker({
  view: 'days',
  range: true,
  altField: '#arrival',
  minDate,
  maxDate,
  clearButton: true,
  prevHtml: '<span class="material-icons">arrow_back</span>',
  nextHtml: '<span class="material-icons">arrow_forward</span>',
  navTitles: {days: 'MM yyyy',},
  onRenderCell,
  onShow: addApplyButton,
  onSelect: toggleApplyButton,
});

datepickerArea.hide();
// object.data('datepicker').hide();
input.on('click', (e) => {
  // console.log('click', e.target);
  // $(this)
  //   .siblings('.dropdown')
  //   .toggleClass('active')
  //   .find('.entry-field__input')
  //   .toggleClass('active');
  object.data('datepicker').show();
  datepickerArea.fadeIn(100);
})



// console.log($('.date-dropdown__input').data('datepicker'))
