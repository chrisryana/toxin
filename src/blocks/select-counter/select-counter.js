const $selects = $('.js-select-counter');
[...$selects].forEach((select) => {initSelectCounter(select)})



function initSelectCounter(select) {
  $(select).on('click', showDropdown);
  $('.form-group__input', $(select)).on('focus', function(e) {$(e.currentTarget).blur()});

  let items = [
    // example:
    // {title: 'Взрослые', count: 1, countWord: 'Гости'},
    // {title: 'Дети', count: 0, countWord: 'Гости'},
    // {title: 'Младенцы', count: 5},
  ]

  let initialItems = [];

  if ($('.select-counter__items--inline', $(select)).length) {
    addChangeEvents($(select));
  }

  function addChangeEvents(el) {
    $('.select-counter__item-button', el).on('click', handleChangeCount);
    $('.simple-button[data-action="clear-select"]', el).on('click', clearValues);
    $('.simple-button[data-action="apply-select"]', el).on('click', applyValues);

    if (initialItems.length) {
      items = JSON.parse(JSON.stringify(initialItems));
      verifyButtons($('.select-counter__items', el), items);
    } else {
      initValues(el)
    }
  }
  
  function hideDropdown(e) {
    const $isInlineSelect = !($(e.target).closest('.select-counter__items--inline').length === 0);
    const $isApplyButtonClick = $(e.target).data('action') === 'apply-select';
    const $isOutsideClick = !$(select).is(e.target) && $(select).has(e.target).length === 0;
    if ($isOutsideClick || $isApplyButtonClick && !$isInlineSelect) {
      resetItemCountInitial();
      $(select).removeClass('select-counter--expanded');
      $(document).off('click', hideDropdown);
      $('.select-counter__item-button', $(select)).off('click', handleChangeCount);
      $('.simple-button[data-action="clear-select"]', $(select)).off('click', clearValues);
      $('.simple-button[data-action="apply-select"]', $(select)).off('click', applyValues);
      items = [];
    }
  }
  
  function showDropdown(e) {
    if (!$(e.currentTarget).hasClass('select-counter--expanded')) {
      $(e.currentTarget).addClass('select-counter--expanded');
      $(document).on('click', hideDropdown);
      addChangeEvents($(e.currentTarget))
    }
  }
  
  function initValues(el) {
    const $liElements = [...$('.select-counter__item', $(el))];
    $liElements.forEach((li) => {
      const itemData = {};
      itemData.title = $('.select-counter__item-word', $(li)).text();
      itemData.count = Number($('.select-counter__item-count', $(li)).text());
      itemData.countWord = $(li).attr('data-countword') || itemData.title;
      items.push(itemData);
    });
    initialItems = JSON.parse(JSON.stringify(items));
  }
  
  function handleChangeCount(e) {
    const liElement = $(e.currentTarget).closest('.select-counter__item');
    const isHaveFooterButtons = !!$(e.currentTarget).closest('.select-counter__items').find('.select-counter__items-footer').length;
    const liIndex = liElement.attr('data-index');
    const countType = $(e.currentTarget).attr('data-action'); // asc | desc
    items[liIndex].count = countType === 'asc' ? items[liIndex].count + 1 : items[liIndex].count - 1;
  
    refreshItemCount(liElement, items[liIndex].count);
  
    if (isHaveFooterButtons) {
      verifyButtons($(e.currentTarget), items);
    } else {
      applyValues(e);
    }
  }
  
  function verifyButtons(el, itemsData) {
    const $clearButton = $(el).closest('.select-counter__items').find('.simple-button[data-action="clear-select"]');
    const clearButtonWrapper = $clearButton.parent();
    const $applyButton = $(el).closest('.select-counter__items').find('.simple-button[data-action="apply-select"]');
    const isEveryEmpty = itemsData.every((item) => item.count === 0);
    if (isEveryEmpty) {
      if (!clearButtonWrapper.hasClass('select-counter__footer-button--hide')) {
        clearButtonWrapper.addClass('select-counter__footer-button--hide');
      }
      $applyButton.prop('disabled', true);
    } else {
      clearButtonWrapper.removeClass('select-counter__footer-button--hide');
      $applyButton.prop('disabled', false);
    }
  }
  
  function refreshItemCount(liElement, value) {
    const $descButton = $('.select-counter__item-button[data-action="desc"]', $(liElement));
    const $ascButton = $('.select-counter__item-button[data-action="asc"]', $(liElement));
    if (value === 0) {
      $descButton.prop('disabled', true);
      $ascButton.prop('disabled', false);
    }
    if (value >= 5) {
      $descButton.prop('disabled', false);
      $ascButton.prop('disabled', true);
    }
    if (value > 0 && value < 5) {
      $descButton.prop('disabled', false);
      $ascButton.prop('disabled', false);
    }
    $('.select-counter__item-count', $(liElement)).text(value);
  }
  
  function resetItemCountInitial() {
    const $liElements = $('.select-counter__item', $(select));
    initialItems.forEach((initValue, index) => {
      refreshItemCount($($liElements[index]), initValue.count);
    })
  }
  
  function clearValues(e) {
    const $liElements = $(e.currentTarget)
      .closest('.select-counter__items')
      .find('.select-counter__item');
  
    items.forEach((dataItem, index) => {
      dataItem.count = 0;
      refreshItemCount($($liElements[index]), dataItem.count);
    });
  
    verifyButtons($(e.currentTarget), items);
  }
  
  function applyValues(e) {
    const countData = getCountData(items);
    const countValue = getCountString(countData);
    $(e.target).closest('.select-counter')
      .find('.form-group__input')
      .val(countValue);
    initialItems = JSON.parse(JSON.stringify(items));
    hideDropdown(e);
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
      'Спальни': ['Спальня', 'Спальни', 'Спален'],
      'Кровати': ['Кровать', 'Кровати', 'Кроватей'],
      'Ванные комнаты': ['Ванная комната', 'Ванные комнаты', 'Ванных комнат'],
    };
    return dictionary[word];
  }
}