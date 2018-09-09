import AbstractView from '../abstract-view';

export default class GenreView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <section class="game game--genre">
        <section class="game__screen">
          <h2 class="game__title">${this.level.question}</h2>
          <form class="game__tracks">
             ${this.level.answers.map((answer, it) => `
                <div class="track">
                  <button class="track__button track__button--play" type="button"></button>
                  <div class="track__status">
                    <audio src="${answer.src}" preload="metadata"></audio>
                  </div>
                  <div class="game__answer">
                    <input class="game__input visually-hidden" type="checkbox" name="answer" value="${answer.genre}" id="answer-${it}">
                    <label class="game__check" for="answer-${it}">Отметить</label>
                  </div>
                </div>`.trim()).join(``)}
      
            <button class="game__submit button" type="submit" disabled>Ответить</button>
          </form>
        </section>
      </section>`;
  }

  bind() {
    const button = this.element.querySelector(`.game__submit`);
    const form = this.element.querySelector(`.game__tracks`);
    const answers = [...form.elements.answer];
    const buttonsPlayMusic = [...form.querySelectorAll(`.track__button`)];
    const musics = [...form.querySelectorAll(`audio`)];
    buttonsPlayMusic[0].classList.add(`track__button--pause`);
    musics[0].play().catch((error) => error);

    buttonsPlayMusic.forEach((btn, index) => {
      btn.addEventListener(`click`, (event) => {
        event.preventDefault();

        if (btn.classList.contains(`track__button--pause`)) {
          btn.classList.remove(`track__button--pause`);
          musics[index].pause();
        } else {
          buttonsPlayMusic.forEach((it, i) => {
            it.classList.remove(`track__button--pause`);
            musics[i].pause();
          });

          btn.classList.add(`track__button--pause`);
          musics[index].play().catch((error) => error);
        }
      });
    });

    answers.forEach((item) => {
      item.addEventListener(`change`, () => {
        button.disabled = !(answers.some((it) => it.checked));
      });
    });

    button.addEventListener(`click`, (event) => {
      event.preventDefault();

      this.checkAnswer(answers);

      form.reset();
      button.disabled = true;
    });
  }

  checkAnswer(answers) {
    //
  }
}
