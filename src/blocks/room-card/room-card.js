import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

$('.room-card__gallery').slick({
  dots: true,
  adaptiveHeight: true,
  nextArrow: getButton('next'),
  prevArrow: getButton('before'),
})

// type = before | next
function getButton(type) {
  const icon = `<i class="material-icons">navigate_${type}</i>`
  return `<button class="room-card__gallery-arrow room-card__gallery-arrow--${type}">${icon}</button>`
}