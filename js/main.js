'use strict';

const mainElement = document.querySelector(`.main`);
const screens = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

/**
 * Отображает экран по переданному номеру
 * @param {Number} element
 */
const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

let current = 0;
/**
 * Функция выбора слайда
 * @param {Number} index
 */
const selectScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  showScreen(screens[current]);
};

