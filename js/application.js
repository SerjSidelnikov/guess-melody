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

  static async start() {
    const splash = new SplashScreen();
    showScreen(splash.element);
    try {
      gameLevels = await Loader.loadData();
      Application.showWelcome();
    } catch (e) {
      Application.showError();
    }
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

  static async showResult(model) {
    const splash = new SplashScreen();
    showScreen(splash.element);
    try {
      await Loader.saveResults(model.dataGame);
      const data = await Loader.loadResults();
      showScreen(new ResultGameView(model.getEndGame(data)).element);
    } catch (e) {
      Application.showError();
    }
  }

  static showError(error) {
    const errorView = new ModalError(error);
    showScreen(errorView.element);
  }
}
