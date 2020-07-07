const dateInputs = $('.price').closest('.dialog__form').find('.date-dropdown__input');
const clickArea = $('.price').closest('.dialog__form').find('.date-dropdown__click-area');

dateInputs.on('change paste keyup input', refreshCost);
clickArea.on('click', click);

function refreshCost(e) {
  console.log('refresh')
}

function click(e) {
  console.log('click')
}