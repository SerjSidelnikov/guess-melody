import {showScreen} from './util';
import GameModel from './game/game-model';
import GameScreen from './game/game-screen';
import WelcomeView from './game/welcome-view';
import FailTimeView from './game/fail-time-view';
import FailTriesView from './game/fail-tries-view';
import ResultGameView from './game/result-success-view';
import {GAME} from './data/game-data';

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeView();
    showScreen(welcome.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel(GAME));
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
}
