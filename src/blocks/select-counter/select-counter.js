const selects = $('.select-counter');

selects.on('click', showDropdown);

let items = [
  // example:
  // {title: 'Взрослые', count: 1, countWord: 'Гости'},
  // {title: 'Дети', count: 0, countWord: 'Гости'},
  // {title: 'Младенцы', count: 5},
]

let initialItems = [];

for (let i = 0; i < selects.length; i++) {
  selects
    .eq(i)
    .find('.form-group__input')
    .on('focus', function(e) {$(this).blur()});
}

function hideDropdown(e) {
  if (!$(e.target).closest('.select-counter').length) {
    resetItemCountInitial();
    selects.removeClass('select-counter--expanded');
    $(document).off('click', hideDropdown);
    $(document).find('.select-counter__item-button').off('click', handleChangeCount);
    $(document).find('.simple-button[data-action="clear-select"]').off('click', clearValues);
    $(document).find('.simple-button[data-action="apply-select"]').off('click', applyValues);
    items = [];
  }
}

function showDropdown(e) {
  if (!$(this).hasClass('select-counter--expanded')) {
    $(this).addClass('select-counter--expanded');
    $(document).on('click', hideDropdown);
    $(this).find('.select-counter__item-button').on('click', handleChangeCount);
    $(this).find('.simple-button[data-action="clear-select"]').on('click', clearValues);
    $(this).find('.simple-button[data-action="apply-select"]').on('click', applyValues);

    if (initialItems.length) {
      items = JSON.parse(JSON.stringify(initialItems));
      verifyButtons($(this).find('.select-counter__items'), items);
    } else {
      initValues($(this))
    }
  }
}

function initValues(el) {
  const liElements = [...el.find('.select-counter__item')];
  liElements.forEach((li) => {
    const itemData = {};
    itemData.title = $(li).find('.select-counter__item-word').text();
    itemData.count = Number($(li).find('.select-counter__item-count').text());
    itemData.countWord = $(li).attr('data-countword') || itemData.title;
    items.push(itemData);
  });
  initialItems = JSON.parse(JSON.stringify(items));
}

function handleChangeCount(e) {
  const liElement = $(this).closest('.select-counter__item');
  const liIndex = liElement.attr('data-index');
  const countType = $(this).attr('data-action'); // asc | desc
  items[liIndex].count = countType === 'asc' ? items[liIndex].count + 1 : items[liIndex].count - 1;

  refreshItemCount(liElement, items[liIndex].count);
  verifyButtons($(this), items);
}

function verifyButtons(el, itemsData) {
  const clearButton = el.closest('.select-counter__items').find('.simple-button[data-action="clear-select"]');
  const clearButtonWrapper = clearButton.parent();
  const applyButton = el.closest('.select-counter__items').find('.simple-button[data-action="apply-select"]');
  const isEveryEmpty = itemsData.every((item) => item.count === 0);
  if (isEveryEmpty) {
    if (!clearButtonWrapper.hasClass('select-counter__footer-button--hide')) {
      clearButtonWrapper.addClass('select-counter__footer-button--hide');
    }
    applyButton.prop('disabled', true);
  } else {
    clearButtonWrapper.removeClass('select-counter__footer-button--hide');
    applyButton.prop('disabled', false);
  }
}

function refreshItemCount(liElement, value) {
  const descButton = liElement.find('.select-counter__item-button[data-action="desc"]');
  const ascButton = liElement.find('.select-counter__item-button[data-action="asc"]');
  if (value === 0) {
    descButton.prop('disabled', true);
    ascButton.prop('disabled', false);
  }
  if (value >= 5) {
    descButton.prop('disabled', false);
    ascButton.prop('disabled', true);
  }
  if (value > 0 && value < 5) {
    descButton.prop('disabled', false);
    ascButton.prop('disabled', false);
  }
  liElement.find('.select-counter__item-count').text(value);
}

function resetItemCountInitial() {
  const liElements = selects.find('.select-counter__item');
  initialItems.forEach((initValue, index) => {
    refreshItemCount($(liElements[index]), initValue.count);
  })
}

function clearValues(e) {
  const liElements = $(this)
    .closest('.select-counter__items')
    .find('.select-counter__item');

  items.forEach((dataItem, index) => {
    dataItem.count = 0;
    refreshItemCount($(liElements[index]), dataItem.count);
  });

  verifyButtons($(this), items);
}

function applyValues(e) {
  const countData = getCountData(items);
  const countValue = getCountString(countData);
  $(this).closest('.select-counter')
    .find('.form-group__input')
    .val(countValue);
  initialItems = JSON.parse(JSON.stringify(items));
}

function getCountData(dataItems) {
  const countData = [
    // example: {countWord: 'Гости', count: 5}
  ];
  dataItems.forEach((item) => {
    const sameCountWordIndex = countData.findIndex((data) => data.countWord === item.countWord);
    if (sameCountWordIndex !== -1) {
      countData[sameCountWordIndex].count += item.count;
    } else {
      const dataItem = {
        countWord: item.countWord,
        count: item.count,
      };
      countData.push(dataItem)
    }
  })
  return countData;
}

function getCountString(countData) {
  const filteredCountData = countData.filter((countItem) => countItem.count !== 0)
  const value = filteredCountData.reduce((string, countItem, index) => {
    const declOfCount = declOfNum(countItem.count, findDeclArray(countItem.countWord));
    const stringOfCount = `${countItem.count} ${declOfCount}`;
    return index === (filteredCountData.length - 1)
      ? `${string}${stringOfCount}`
      : `${string}${stringOfCount}, `;
  }, '')
  return value.toLowerCase();
}

function declOfNum(n, titles) {
  return titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
};

function findDeclArray(word) {
  const dictionary = {
    'Гости': ['Гость', 'Гостя', 'Гостей'],
    'Младенцы': ['Младенец', 'Младенца', 'Младенцев'],
  };
  return dictionary[word];
}