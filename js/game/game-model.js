import {INITIAL_GAME, die, tick, statistics} from '../data/game-data';
import {changeLevel} from '../data/change-level';
import {resultGame} from '../data/result-game';

export default class GameModel {
  constructor(data) {
    this.data = data;
    this._state = Object.assign({}, INITIAL_GAME);
  }

  get state() {
    return this._state;
  }

  get scoring() {
    return this._resultGame.score;
  }

  set result(user) {
    this._resultGame = user;
  }

  get result() {
    return this._resultGame;
  }

  get endGame() {
    return resultGame(statistics, this.result);
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
