import {GAME, INITIAL_GAME, die, user, statistics} from '../data/game-data';
import {showScreen} from '../util';
import {countPoints} from '../data/count-points';
import {resultGame} from '../data/result-game';
import GenreView from './genre-view';
import WelcomeView from './welcome-view';
import FailTriesView from './fail-tries-view';
import HeaderView from './header-view';
import ArtistView from './artist-view';
import ModalResetView from './modal-confirm-view';
import ResultSuccessView from './result-success-view';

const BASE_TIME = 35;
let game = Object.assign({}, INITIAL_GAME);

const welcomeScreen = new WelcomeView();
welcomeScreen.play = () => {
  startGame();
};

const failTries = new FailTriesView();
failTries.restart = () => {
  startGame();
};

const modalReset = new ModalResetView();
modalReset.onCancel = () => {
  modalReset.element.firstElementChild.classList.add(`modal--hidden`);
};

modalReset.onConfirm = () => {
  modalReset.element.firstElementChild.classList.add(`modal--hidden`);
  resetGame();
  showScreen(welcomeScreen.element);
};

const resetGame = () => {
  game = Object.assign({}, INITIAL_GAME);
  user.clear();
};

const updateGame = (state, level) => {
  const header = new HeaderView(state);
  header.restart = () => {
    modalReset.element.firstElementChild.classList.remove(`modal--hidden`);
  };
  level.element.firstElementChild.insertBefore(header.element, level.element.firstElementChild.firstElementChild);
  level.element.appendChild(modalReset.element);
  showScreen(level.element);
};

const gameGenre = (level) => {
  const gameLevel = new GenreView(level);

  gameLevel.checkAnswer = (answers) => {
    const userAnswers = answers.filter((it) => it.checked);
    const answerIsCorrect = userAnswers.some((it) => it.value !== level.answer);

    if (answerIsCorrect) {
      try {
        game = die(game);
        user.add({result: false, time: BASE_TIME});
        updateGame(game, gameLevel);
      } catch (e) {
        showScreen(failTries.element);
        return;
      }
    } else {
      user.add({result: true, time: BASE_TIME});
    }

    updateGame(game, gameArtist(GAME[++game.level]));
  };

  return gameLevel;
};

const gameArtist = (level) => {
  const gameLevel = new ArtistView(level);

  gameLevel.checkAnswer = (answer) => {
    if (answer.value !== GAME[game.level].question.name) {
      try {
        game = die(game);
        updateGame(game, gameLevel);
        user.add({result: false, time: BASE_TIME});
      } catch (e) {
        showScreen(failTries.element);
        return;
      }
    } else {
      user.add({result: true, time: BASE_TIME});
    }

    if (GAME[++game.level]) {
      updateGame(game, gameGenre(GAME[game.level]));
    } else {
      const resultUserGame = {
        score: countPoints([...user], game.lives),
        lives: game.lives,
        time: BASE_TIME,
      };

      const resultScreen = new ResultSuccessView(resultUserGame.score, resultGame(statistics, resultUserGame), game);

      resultScreen.restart = () => {
        resetGame();
        startGame();
      };

      showScreen(resultScreen.element);
    }
  };

  return gameLevel;
};

const startGame = () => {
  resetGame();
  updateGame(game, gameGenre(GAME[game.level]));
};

export default startGame;
