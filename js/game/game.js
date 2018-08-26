import {GAME, INITIAL_GAME, die} from '../data/game-data';
import {getElementFromTemplate, showScreen} from '../util';
import genreScreen from './game-genre';
import welcomeScreen from './welcome';
import failTries from './fail-tries';
import header from './header';
import artistScreen from './game-artist';
import modalReset from './modal-confirm';

let game;

const resetGame = () => {
  game = Object.assign({}, INITIAL_GAME);
};

const startGame = () => {
  game = Object.assign({}, INITIAL_GAME);

  let headerTemplate = getElementFromTemplate(header(game));

  const updateGame = (state, element) => {
    headerTemplate = getElementFromTemplate(header(state));
    element.firstElementChild.replaceChild(headerTemplate, element.firstElementChild.firstElementChild);
    element.appendChild(modalReset);
  };

  let gameGenre = getElementFromTemplate(genreScreen(GAME[game.level]));
  gameGenre.firstElementChild.insertBefore(headerTemplate, gameGenre.firstElementChild.firstElementChild);
  gameGenre.appendChild(modalReset);
  showScreen(gameGenre);

  const buttonResetGame = gameGenre.querySelector(`.game__back`);
  buttonResetGame.addEventListener(`click`, (event) => {
    event.preventDefault();
    modalReset.firstElementChild.classList.remove(`modal--hidden`);
  });

  modalReset.querySelector(`#ok`).addEventListener(`click`, (event) => {
    event.preventDefault();
    resetGame();
    showScreen(welcomeScreen);
    modalReset.firstElementChild.classList.add(`modal--hidden`);
  });

  let gameArtist;

  const actionGameGenre = () => {
    const button = gameGenre.querySelector(`.game__submit`);
    const form = gameGenre.querySelector(`.game__tracks`);
    const answers = [...form.elements.answer];
    const buttonsPlayMusic = [...form.querySelectorAll(`.track__button`)];
    const musics = [...form.querySelectorAll(`audio`)];
    buttonsPlayMusic[0].classList.add(`track__button--pause`);
    musics[0].play();

    buttonsPlayMusic.forEach((btn, index) => {
      btn.addEventListener(`click`, (event) => {
        event.preventDefault();

        if (btn.classList.contains(`track__button--pause`)) {
          btn.classList.remove(`track__button--pause`);
          musics[index].pause();
        } else {
          for (let i = 0; i < buttonsPlayMusic.length; i++) {
            buttonsPlayMusic[i].classList.remove(`track__button--pause`);
            musics[i].pause();
          }

          btn.classList.add(`track__button--pause`);
          musics[index].play();
        }
      });
    });

    // Проверяем на наличие активного ответа и убираем у кнопки атрибут disabled
    answers.forEach((item) => {
      item.addEventListener(`change`, () => {
        button.disabled = !(answers.some((it) => it.checked));
      });
    });

    // Проверяем ответы на правильность, переходим к следующему экрану и сбрасываем форму
    button.addEventListener(`click`, (event) => {
      event.preventDefault();

      const userAnswers = answers.filter((it) => it.checked);

      for (const answer of userAnswers) {
        if (answer.value !== GAME[game.level].answer) {
          try {
            game = die(game);
            updateGame(game, gameGenre);
            form.reset();
            button.disabled = true;
            return;
          } catch (e) {
            showScreen(failTries);
            return;
          }
        }
      }

      gameArtist = getElementFromTemplate(artistScreen(GAME[++game.level], game));
      gameArtist.firstElementChild.insertBefore(headerTemplate, gameArtist.firstElementChild.firstElementChild);
      gameArtist.appendChild(modalReset);
      showScreen(gameArtist);
      actionGameArtist();

      form.reset();
      button.disabled = true;
    });
  };

  actionGameGenre();

  const actionGameArtist = () => {
    const form = gameArtist.querySelector(`.game__artist`);
    const answers = [...form.elements.answer];
    const btnPlayMusic = gameArtist.querySelector(`.track__button`);
    const audio = gameArtist.querySelector(`audio`);

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
      answer.addEventListener(`click`, () => {
        if (answer.value !== GAME[game.level].question.name) {
          try {
            game = die(game);
            updateGame(game, gameArtist);
            form.reset();
            return;
          } catch (e) {
            showScreen(failTries);
            return;
          }
        }

        gameGenre = getElementFromTemplate(genreScreen(GAME[++game.level], game));
        gameGenre.firstElementChild.insertBefore(headerTemplate, gameGenre.firstElementChild.firstElementChild);
        gameGenre.appendChild(modalReset);
        showScreen(gameGenre);
        actionGameGenre();

        form.reset();
      });
    }
  };
};

export default startGame;
