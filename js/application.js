import {showScreen} from './util';
import GameModel from './game/game-model';
import GameScreen from './game/game-screen';
import WelcomeView from './game/welcome-view';
import FailTimeView from './game/fail-time-view';
import FailTriesView from './game/fail-tries-view';
import ResultGameView from './game/result-success-view';
import ModalError from './game/modal-error-view';
import SplashScreen from './game/splash-screen';
import Loader from './game/loader';

let gameLevels;

export default class Application {

  static start() {
    const splash = new SplashScreen();
    showScreen(splash.element);
    Loader.loadData()
      .then((data) => {
        gameLevels = data;
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
    const splash = new SplashScreen();
    showScreen(splash.element);
    Loader.saveResults(model.dataGame)
      .then(() => Loader.loadResults())
      .then((data) => showScreen(new ResultGameView(model.getEndGame(data)).element))
      .catch(Application.showError);
  }

  static showError(error) {
    const errorView = new ModalError(error);
    showScreen(errorView.element);
  }
}
