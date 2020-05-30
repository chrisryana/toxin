import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';

$('.date-dropdown__button').on('click', (e) => {
  console.log('click', e.target)
  // $(this)
  //   .siblings('.dropdown')
  //   .toggleClass('active')
  //   .find('.entry-field__input')
  //   .toggleClass('active');
  $('.date-dropdown__datepicker').datepicker({
    view: 'days',
    // inline: true
  })
})



// console.log($('.date-dropdown__input').data('datepicker'))
