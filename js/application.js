import {showScreen} from './util';
import GameModel from './game/game-model';
import GameScreen from './game/game-screen';
import WelcomeView from './game/welcome-view';
import FailTimeView from './game/fail-time-view';
import FailTriesView from './game/fail-tries-view';
import ResultGameView from './game/result-success-view';
import ModalError from './game/modal-error-view';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let gameLevels;

export default class Application {

  static start() {
    window.fetch(`https://es.dump.academy/guess-melody/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        gameLevels = data;
        return gameLevels;
      })
      .then(Application.showWelcome)
      .catch(Application.showError);
  }

  static showWelcome() {
    const welcome = new WelcomeView();
    showScreen(welcome.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel(gameLevels));
    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showFailTime() {
    const failTime = new FailTimeView();
    showScreen(failTime.element);
  }

  static showFailTries() {
    const failTries = new FailTriesView();
    showScreen(failTries.element);
  }

  static showResult(model) {
    const resultGame = new ResultGameView(model);
    showScreen(resultGame.element);
  }

  static showError(error) {
    const errorView = new ModalError(error);
    showScreen(errorView.element);
  }
}
