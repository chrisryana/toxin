# Toxin – сайт для поиска номеров в отеле

Pixel Perfect верстка проекта с использованием Pug, Scss, jQuery, Webpack

**Цель:**
- Научиться проектировать компонентную архитектуру с помощью pug
- Изучить Pug
- Научиться подключать и настраивать шрифты так, чтобы они корректно отображались в разных браузерах
- Научиться искать, подключать и настраивать JavaScript-библиотеки и jQuery-плагины

## Быстрый старт

#### `npm i` – установить зависимости проекта

#### `npm run dev` – запуск devServer на http://localhost:8081/

## Скрипты

#### `npm run dev` – запуск devServer на http://localhost:8081/

#### `npm run build` – production сборка проекта

#### `npm run puglint` – запуск линтера для файлов pug

## Используемые библиотеки

- [air-datepicker](https://github.com/t1m0n/air-datepicker)
- [ion.rangeSlider](https://github.com/IonDen/ion.rangeSlider)
- [jQuery-Mask-Plugin](https://github.com/igorescobar/jQuery-Mask-Plugin)
- [normalize.css](https://github.com/necolas/normalize.css)
- [slick-carousel](https://github.com/kenwheeler/slick)
- [material-design-icons](https://github.com/google/material-design-icons)

## Макеты

<table>
  <tr>
    <th><a href="https://chrisryana.github.io/toxin/" target="_blank">Landing Page</a></th>
    <th><a href="https://chrisryana.github.io/toxin/search" target="_blank">Search Room</a></th>
    <th><a href="https://chrisryana.github.io/toxin/room" target="_blank">Room Details</a></th>
    <th><a href="https://chrisryana.github.io/toxin/registration" target="_blank">Registration</a></th> 
    <th><a href="https://chrisryana.github.io/toxin/signin" target="_blank">SignIn</a></th> 
  </tr>
	
  <tr valign="top">
    <td>
      <a href="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Landing%20page.jpg?raw=true" target="_blank">
        <img src="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Landing%20page.jpg?raw=true" width="250" alt="Главная страница">
      </a>
    </td>
    <td>
      <a href="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Search%20room/Filter.jpg?raw=true" target="_blank"><img src="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Search%20room/Filter.jpg?raw=true" width="250" alt="Страница поиска"></a>
    </td>
	<td>
      <a href="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Room%20details.jpg?raw=true" target="_blank"><img src="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Room%20details.jpg?raw=true" width="250" alt="Страница номера"></a>
    </td>
  <td>
      <a href="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Registration.jpg?raw=true" target="_blank"><img src="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Registration.jpg?raw=true" width="250" alt="Страница регистрации"></a>
    </td>
  <td>
      <a href="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Sign%20in.jpg?raw=true" target="_blank"><img src="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Sign%20in.jpg?raw=true" width="250" alt="Страница авторизации"></a>
    </td>
  </tr>
  
  <tr>
  <th><a href="https://chrisryana.github.io/toxin/colors-types" target="_blank">Colors & Types</a></th>
  <th><a href="https://chrisryana.github.io/toxin/form-elements" target="_blank">Form Elements</a></th>
  <th><a href="https://chrisryana.github.io/toxin/cards" target="_blank">Cards</a></th>
  <th><a href="https://chrisryana.github.io/toxin/headers-footers" target="_blank">Headers & Footers</a></th>
  </tr>
  
  <tr valign="top">
    <td>
      <a href="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Colors%20&%20Type.jpg?raw=true" target="_blank">
        <img src="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Colors%20&%20Type.jpg?raw=true" width="250" alt="Страница цветов и шрифтов">
      </a>
    </td>
    <td>
      <a href="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Form%20Elements.jpg?raw=true" target="_blank"><img src="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Form%20Elements.jpg?raw=true" width="250" alt="Страница с элементами форм"></a>
    </td>
  <td>
      <a href="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Cards.jpg?raw=true" target="_blank"><img src="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Cards.jpg?raw=true" width="250" alt="Страница карточек"></a>
    </td>
  <td>
      <a href="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Headers%20&%20Footers.jpg?raw=true" target="_blank"><img src="https://github.com/chrisryana/toxin/blob/master/src/pixel-perfect/Headers%20&%20Footers.jpg?raw=true" width="250" alt="Страница с шапками и футерами сайта"></a>
    </td>
  </tr>
</table>

### Структура проекта

```
├── src/                             # Исходники
│   ├── assets/                      # Подключаемые ресурсы
│   │   ├── fonts/                   # Шрифты используемые в проекте
│   │   ├── img/                     # Изображения используемые в проекте
│   │   └── styles/                  # Стили
│   │       ├── theme/               # Папка с темой проекта
│   │       │   ├── colors.scss      # Файл с переменными цветов
│   │       │   ├── fonts.scss       # Файл с подлючаемыми шрифтами
│   │       │   └── spaces.scss      # Переменные отступов
│   │       └── main.scss            # Файл в который импортируются все стили
│   ├── blocks/                      # Папка с блоками проекта
│   ├── favicons/                    # Фавиконки для разных браузеров
│   ├── layouts/                     # Папка с шаблонами разметки
│   ├── pages/                       # Папка страниц проекта
│   └── pixel-perfect/               # Скриншоты для сверки Pixel Perfect
├── .babelrc                         # Конфигурация компиляции Javascript в es5
├── .eslintrc.json                   # Конфигурация проверки JavaScript в ESLint
├── .gitignore                       # Список исключённых файлов из Git
├── .pug-lintrc                      # Конфигурация проверки pug-файлов
├── package.json                     # Список модулей и прочей информации
├── postcss.config.js                # Конфигурация компиляции стилей
├── README.md                        # Документация шаблона
├── webpack.base.conf.js             # Базовая конфигурация Webpack.js
├── webpack.build.conf.js            # Конфигурация Webpack.js для production сборки
└── webpack.dev.conf.js              # Конфигурация Webpack.js для dev сборки
```
