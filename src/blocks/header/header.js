import '../hamburger-menu/hamburger-menu';

$('.js-site-navigation__dropdown').hide();
$('.js-site-navigation__item')
  .on('mouseover', showMenu)
  .on('mouseleave', hideMenu);

function showMenu(e) {
  $('.js-site-navigation__dropdown', $(e.currentTarget)).fadeIn(100);
}

function hideMenu(e) {
  // TODO: пофиксить моргания
  $('.js-site-navigation__dropdown', $(e.currentTarget))
    // .delay(300)
    .fadeOut(100);
}

