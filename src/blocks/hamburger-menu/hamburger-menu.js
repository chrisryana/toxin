$('.hamburger-menu').on('click', toggleMenu);

function toggleMenu(e) {
  e.preventDefault();
  $('.hamburger-menu__item', e.currentTarget).toggleClass('hamburger-menu__item--open');
  $('body').toggleClass('blocked');
  $(e.currentTarget).closest('.header')
    .find('.header__navigation-wrapper')
    .toggleClass('header__navigation-wrapper--visible')
}