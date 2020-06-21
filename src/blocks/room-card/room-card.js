import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

$('.room-card__gallery').slick({
  dots: true,
  // dotsClass: 'room-card__gallery-dots',
  adaptiveHeight: true,

  // variableWidth: true,
  nextArrow: getButton('next'),
  prevArrow: getButton('before'),
  // variableWidth: true,
})

// type = before | next
function getButton(type) {
  const icon = `<i class="material-icons">navigate_${type}</i>`
  return `<button class="room-card__gallery-arrow room-card__gallery-arrow--${type}">${icon}</button>`
}