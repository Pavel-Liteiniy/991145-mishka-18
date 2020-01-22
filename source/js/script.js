// Отображает и скрывает мобильное меню
var nav = document.querySelector('.header__nav');
var button = document.querySelector('.header__button');

nav.classList.remove('header__nav--nojs');

button.addEventListener('click', function () {
  if (nav.classList.contains('header__nav--closed')) {
    nav.classList.remove('header__nav--closed');
    nav.classList.add('header__nav--opened');
  } else {
    nav.classList.add('header__nav--closed');
    nav.classList.remove('header__nav--opened');
  }
});

// Отображает и скрывает модальное окно
var links = document.querySelectorAll(".button--modal");
var modal = document.querySelector(".modal");
var body = document.querySelector("body");
var inputRadio = modal.querySelector("[id=choose-size-s]");
var overlay = document.querySelector(".modal__overlay");

for (var i = 0; i < links.length; ++i) {
  links[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    modal.classList.add("modal--show");
    overlay.classList.add("modal__overlay--show");
    body.classList.add("body-hidden");
    inputRadio.focus();
  });
}

overlay.addEventListener("click", function (evt) {
  modal.classList.remove("modal--show");
  overlay.classList.remove("modal__overlay--show");
  body.classList.remove("body-hidden");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains("modal--show")) {
      modal.classList.remove("modal--show");
      overlay.classList.remove("modal__overlay--show");
      body.classList.remove("body-hidden");
    }
  }
});

// Интерактивная карта Яндекс
ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [59.938747, 30.323093],
    zoom: 16
  }, {
    searchControlProvider: 'yandex#search'
  }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Собственный значок метки',
      balloonContent: 'г. Санкт-Петербург, ул. Большая Конюшенная, д. 19/8, офис 101'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: '../img/icon-map-pin.svg',
      // Размеры метки.
      iconImageSize: [66, 101],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-30, -101]
    })

  myMap.geoObjects
    .add(myPlacemark);
});
