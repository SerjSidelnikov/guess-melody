import AbstractView from '../abstract-view';
import Application from '../application';

export default class ResultSuccessView extends AbstractView {
  constructor(model) {
    super();
    this.score = model.score;
    this.lives = model.lives;
    this.text = model.text;
    this._time = model.time;
    this.min = Math.trunc(this._time / 60);
    this.sec = (((this._time / 60) - this.min) * 60).toFixed(0);
  }

  get template() {
    return `
      <section class="result">
        <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <h2 class="result__title">Вы настоящий меломан!</h2>
        <p class="result__total">За ${this.min > 0 ? `${this.min} минуты и` : ``} ${this.sec} секунд вы набрали ${this.score} баллов, совершив ${3 - this.lives} ошибки</p>
        <p class="result__text">${this.text}</p>
        <button class="result__replay" type="button">Сыграть ещё раз</button>
      </section>`;
  }

  bind() {
    this.element.querySelector(`.result__replay`).addEventListener(`click`, (event) => {
      event.preventDefault();
      Application.showGame();
    });
  }
}
