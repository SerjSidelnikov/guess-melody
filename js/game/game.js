import {GAME, INITIAL_GAME, die, user, statistics} from '../data/game-data';
import {getElementFromTemplate, showScreen} from '../util';
import {countPoints} from '../data/count-points';
import {resultGame} from '../data/result-game';
import genreScreen from './game-genre';
import welcomeScreen from './welcome';
import failTries from './fail-tries';
import header from './header';
import artistScreen from './game-artist';
import modalReset from './modal-confirm';
import resultScreen from './result-success';

const BASE_TIME = 35;
let game;

const resetGame = () => {
  game = Object.assign({}, INITIAL_GAME);
  user.clear();
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

  let gameArtist;

  const actionGameGenre = () => {
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
      const result = userAnswers.some((it) => it.value !== GAME[game.level].answer);

      if (result) {
        try {
          game = die(game);
          user.add({result: false, time: BASE_TIME});
          updateGame(game, gameGenre);
          form.reset();
          button.disabled = true;
        } catch (e) {
          showScreen(failTries);
          return;
        }
      } else {
        user.add({result: true, time: BASE_TIME});
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
    const buttonResetGame = gameArtist.querySelector(`.game__back`);
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
            user.add({result: false, time: BASE_TIME});
          } catch (e) {
            showScreen(failTries);
            return;
          }
        } else {
          user.add({result: true, time: BASE_TIME});
        }

        if (GAME[++game.level]) {
          gameGenre = getElementFromTemplate(genreScreen(GAME[game.level], game));
          gameGenre.firstElementChild.insertBefore(headerTemplate, gameGenre.firstElementChild.firstElementChild);
          gameGenre.appendChild(modalReset);
          showScreen(gameGenre);
          actionGameGenre();
        } else {
          const resultUserGame = {
            score: countPoints([...user], game.lives),
            lives: game.lives,
            time: BASE_TIME,
          };

          const resultTemplate = getElementFromTemplate(resultScreen(resultUserGame.score, resultGame(statistics, resultUserGame), game));

          resultTemplate.querySelector(`.result__replay`).addEventListener(`click`, (event) => {
            event.preventDefault();
            resetGame();
            startGame();
          });

          showScreen(resultTemplate);
        }

        form.reset();
      });
    }
  };
};

export default startGame;
