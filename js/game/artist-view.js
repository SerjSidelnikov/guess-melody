import AbstractView from '../abstract-view';

export default class ArtistView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <section class="game game--artist">
        <section class="game__screen">
          <h2 class="game__title">${this.level.title}</h2>
          <div class="game__track">
            <button class="track__button track__button--play track__button--pause" type="button"></button>
            <audio src="${this.level.question.src}" autoplay></audio>
          </div>
      
          <form class="game__artist">
            ${this.level.answers.map((answer, it) => `
              <div class="artist">
                <input class="artist__input visually-hidden" type="radio" name="answer" value="${answer.name}" id="answer-${it}">
                <label class="artist__name" for="answer-${it}">
                  <img class="artist__picture" src="${answer.image}" alt="${answer.name}">
                  ${answer.name}
                </label>
              </div>`.trim()).join(``)}
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
        audio.play();
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

  checkAnswer(answer) {
    //
  }
}
