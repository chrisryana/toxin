# Toxin – сайт для поиска номеров в отеле

**Цель:**
- Научиться проектировать компонентную архитектуру, где каждый блок можно переиспользовать
- Изучить Pug
- Научиться отзывчивой вёрстке
- Научиться подключать и настраивать шрифты так, чтобы они корректно отображались в разных браузерах
- Научиться искать, подключать и настраивать JavaScript-библиотеки и jQuery-плагины в частности

## Требования к верстке:

- Ориентироваться на последние версии Chrome и Firefox. На Safari и старые IE можно забить для этих заданий
- Все отступы и размеры элементов должны быть соблюдены, для этого во время работы используйте расширение PerfectPixel
- Все шрифты должны быть подключены и сгенерированы в форматах .ttf, .woff, .svg в сервисе Font2Web
- Все страницы должны быть по максимуму responsive. Можно максимальной ширину сделать 1920, а минимальной 320, а между этими значениями подстраиваться под ширину страницы
- Компонентность. В стандартах будет требоваться использование БЭМ, так что предлагаем сразу его использовать. Необходимо настроить Parcel или Webpack и шаблоны, чтобы каждый БЭМ-овский блок находился в отдельной папке (там будет шаблон самого блока и все его стили, скрипты и картинки). Затем в index.pug вы будете просто подключать самые верхние блоки, а они уже будут внутри себя импортировать вложенные блоки, где надо. Каждый отдельный элемент лучше делать отдельным БЭМ-блоком. Мы сделали небольшой туториал по компонентнуой архитектуре, где вы можете понять основные принципы
- Использовать в макетах препроцессоры по максимуму. Вам в любом случае надо будет это сделать для соблюдения предыдущего требования про компонентность, импорты и вставки компонентов друг в друга вы на сыром HTML не сделаете. Подключайте Parcel (или Webpack), он же нужен будет для 4-го задания, и через него настройте сборку Pug (замена HTML)и SCSS (замена CSS). Конкретно эти технологии просто рекомендации, можете использовать другие препроцессоры, главное, чтобы они позволяли вам сделать вкладываемые компоненты с чёткими контрактами.
- В этом задании вам нужно сверстать все элементы из макета, разбив на компоненты. То есть прямо по макету накидать на одной странице все компоненты
- Сделать отдельно сами страницы проекта по поиску номеров в отеле, где эти блоки будут использоваться. Обратите внимание, что некоторые блоки будут в немного измененных модификациях (в разных местах будут разный цвет, разные масштабы или еще что-то подобное)
- Так же такие вещи,как бегунки, календари и дропдауны должны быть сделаны через js, можете подключать какие угодно jQuery-плагины для этого
