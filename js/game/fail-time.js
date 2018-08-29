import {getElementFromTemplate, showScreen} from '../util';
import welcomeScreen from './welcome';

const template = `
<section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Увы и ах!</h2>
  <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
  <button class="result__replay" type="button">Попробовать ещё раз</button>
</section>`;

const element = getElementFromTemplate(template);

// Вешаем на кнопку "Попробовать ещё раз" событие на переход к приветственному экрану
element.querySelector(`.result__replay`).addEventListener(`click`, (event) => {
  event.preventDefault();

  showScreen(welcomeScreen);
});

export default element;