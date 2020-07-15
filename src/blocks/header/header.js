$('.site-navigation__dropdown').hide();
$('.site-navigation__item')
  .on('mouseover', showMenu)
  .on('mouseleave', hideMenu);

function showMenu(e) {
  $('.site-navigation__dropdown', $(e.currentTarget)).fadeIn(100);
}

function hideMenu(e) {
  // TODO: пофиксить моргания
  $('.site-navigation__dropdown', $(e.currentTarget)).delay(300).fadeOut(100);
}