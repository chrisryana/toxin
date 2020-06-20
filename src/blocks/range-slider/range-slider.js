import 'ion-rangeslider';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';

$('.range-slider__input').ionRangeSlider({
  step: 100,
  type: "double",
  skin: "round",
  hide_min_max: true,
  hide_from_to: true,
  onChange: updateValue,
});


function updateValue(data) {
  const valueArea = $(data.input).closest('.range-slider').find('.range-slider__caption');
  const newFrom = `${data.from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;")}₽`;
  const newTo = `${data.to.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;")}₽`;
  valueArea.html(`${newFrom} - ${newTo}`);
}