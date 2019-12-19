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
