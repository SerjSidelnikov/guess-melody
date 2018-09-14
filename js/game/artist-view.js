import AbstractView from '../abstract-view';
import {DEBUG} from '../data/game-data';

export default class ArtistView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <section class="game game--artist">
        <section class="game__screen">
          <h2 class="game__title">${this.level.question}</h2>
          <div class="game__track">
            <button class="track__button track__button--play track__button--pause" type="button"></button>
            <audio src="${this.level.src}" autoplay></audio>
          </div>
      
          <form class="game__artist">
            ${this.level.answers.map((answer, it) => `
              <div class="artist">
                <input class="artist__input visually-hidden" type="radio" name="answer" value="${answer.isCorrect}" id="answer-${it}">
                <label class="artist__name" for="answer-${it}">
                  <img
                    class="artist__picture"
                    src="${answer.image.url}"
                    alt="${answer.title}"
                    ${DEBUG && answer.isCorrect ? `style="border: 2px solid red;"` : ``}>
                  ${answer.title}
                </label>
              </div>`).join(``)}
          </form>
        </section>
      </section>`;
  }

  bind() {
    const form = this.element.querySelector(`.game__artist`);
    const answers = [...form.elements.answer];
    const btnPlayMusic = this.element.querySelector(`.track__button`);
    const audio = this.element.querySelector(`audio`);

    btnPlayMusic.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      btnPlayMusic.classList.toggle(`track__button--pause`);

      if (btnPlayMusic.classList.contains(`track__button--pause`)) {
        audio.play().catch(() => ({}));
      } else {
        audio.pause();
      }
    });

    for (const answer of answers) {
      answer.addEventListener(`click`, (event) => {
        event.preventDefault();

        this.checkAnswer(answer);

        form.reset();
      });
    }
  }

  checkAnswer() {
    //
  }
}
