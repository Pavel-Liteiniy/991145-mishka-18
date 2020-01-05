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
var link = document.querySelector(".button--modal"); // находит первый подходящий элемент в DOM и всё? На странице каталога скрипт срабатывает только на первом продукте.
var modal = document.querySelector(".modal");
var inputRadio = modal.querySelector("[id=choose-size-s]");
var overlay = document.querySelector(".modal__overlay");

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.add("modal--show");
  overlay.classList.add("modal__overlay--show");
  inputRadio.focus();
});

overlay.addEventListener("click", function (evt) {
  modal.classList.remove("modal--show");
  overlay.classList.remove("modal__overlay--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains("modal--show")) {
      modal.classList.remove("modal--show");
      overlay.classList.remove("modal__overlay--show");
    }
  }
});
