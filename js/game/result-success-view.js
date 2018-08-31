import AbstractView from '../abstract-view';

export default class ResultSuccessView extends AbstractView {
  constructor(points, result, game) {
    super();
    this.points = points;
    this.result = result;
    this.game = game;
  }

  get template() {
    return `
      <section class="result">
        <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <h2 class="result__title">Вы настоящий меломан!</h2>
        <p class="result__total">За 3 минуты и 25 секунд вы набрали ${this.points} баллов (8 быстрых), совершив ${3 - this.game.lives} ошибки</p>
        <p class="result__text">${this.result}</p>
        <button class="result__replay" type="button">Сыграть ещё раз</button>
      </section>`;
  }

  bind() {
    this.element.querySelector(`.result__replay`).addEventListener(`click`, (event) => {
      event.preventDefault();
      this.restart();
    });
  }

  restart() {
    //
  }
}
