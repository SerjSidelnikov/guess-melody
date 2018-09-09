import {INITIAL_GAME, die, tick} from '../data/game-data';
import {changeLevel} from '../data/change-level';
import {resultGame} from '../data/result-game';

const FULL_TIME = 300;

export default class GameModel {
  constructor(data) {
    this.data = data;
    this._state = Object.assign({}, INITIAL_GAME);
  }

  get state() {
    return this._state;
  }

  set gameUser(user) {
    this._game = user;
  }

  get gameUser() {
    return this._game;
  }

  getEndGame(data) {
    const statistics = data.map((item) => item.score);
    return {
      score: this.gameUser.score,
      time: FULL_TIME - this._state.time,
      lives: this._state.lives,
      text: resultGame(statistics, this.gameUser),
    };
  }

  get dataGame() {
    return {
      time: FULL_TIME - this._state.time,
      score: this.gameUser.score,
    };
  }

  restart() {
    this._state = Object.assign({}, INITIAL_GAME);
  }

  hasNextLevel() {
    return this.data[this._state.level + 1] !== void 0;
  }

  nextLevel() {
    this._state = changeLevel(this.state, this._state.level + 1);
  }

  get levelGame() {
    return this.data[this._state.level];
  }

  die() {
    this._state = die(this._state);
  }

  tick() {
    this._state = tick(this._state);
  }
}
