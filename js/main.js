'use strict';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

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
 * Функция выбора экрана
 * @param {Number} index
 */
const selectScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  showScreen(screens[current]);
};

// Вешаем обработчик на нажатие стрелки влево или вправо для переключения экранов
document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      selectScreen(current + 1);
      break;
    case LEFT_ARROW:
      selectScreen(current - 1);
      break;
  }
});

// Показываем приветственный экран
selectScreen(current);
