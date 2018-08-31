import {showScreen} from './util';
import WelcomeView from './game/welcome-view';
import startGame from './game/game';

const welcomeScreen = new WelcomeView();

showScreen(welcomeScreen.element);

welcomeScreen.play = () => {
  startGame();
};
