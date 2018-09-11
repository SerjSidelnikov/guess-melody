import HeaderView from './header-view';
import GenreView from './genre-view';
import ArtistView from './artist-view';
import ModalResetView from './modal-confirm-view';
import Application from '../application';
import {user, QuestionType} from '../data/game-data';
import {countPoints} from '../data/count-points';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;
    this.init();
  }

  init() {
    this.header = new HeaderView(this.model.state);
    this.modalReset = new ModalResetView();
    this.gameLevel(this.model.levelGame);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.level.element);
    this.root.appendChild(this.modalReset.element);
    this.level.element.firstElementChild.insertBefore(this.header.element, this.level.element.firstElementChild.firstElementChild);
  }

  get element() {
    return this.root;
  }

  gameLevel(level) {
    switch (level.type) {
      case QuestionType.GENRE:
        this.level = new GenreView(level);
        break;
      case QuestionType.ARTIST:
        this.level = new ArtistView(level);
        break;
    }
  }

  startGame() {
    this.restart();
    this.changeLevel(this.level);
    this.startTimer();
  }

  startTimer() {
    this._interval = setTimeout(() => {
      this.model.tick();
      this.updateHeader();
      this.startTimer();
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this._interval);
  }

  restart() {
    this.model.restart();
    user.clear();
  }

  endGame() {
    this.restart();
    Application.showFailTime();
  }

  confirm() {
    this.modalReset.element.firstElementChild.classList.remove(`modal--hidden`);
    this.stopTimer();
    this.modalReset.onCancel = () => {
      this.modalReset.element.firstElementChild.classList.add(`modal--hidden`);
      this.startTimer();
    };

    this.modalReset.onConfirm = () => {
      this.modalReset.element.firstElementChild.classList.add(`modal--hidden`);
      this.restart();
      Application.showWelcome();
    };
  }

  updateHeader() {
    this.header = new HeaderView(this.model.state);
    this.header.restart = this.confirm.bind(this);
    this.header.gameOver = this.endGame.bind(this);
    this.level.element.firstElementChild.replaceChild(this.header.element, this.level.element.firstElementChild.firstElementChild);
  }

  changeLevel(level) {
    if (level instanceof GenreView) {
      level.checkAnswer = this.answerGenre.bind(this);
    }

    if (level instanceof ArtistView) {
      level.checkAnswer = this.answerArtist.bind(this);
    }

    this.changeContentView(level);
  }

  answerGenre(answer) {
    this.stopTimer();

    const countCorrectAnswers = this.model.levelGame.answers.filter((it) => it.genre === this.model.levelGame.genre);
    const userAnswers = answer.filter((it) => it.checked);
    const answerIsFalse = userAnswers.some((it) => it.value !== this.model.levelGame.genre);
    const answerIsCorrect = userAnswers.filter((it) => it.value === this.model.levelGame.genre);

    if (answerIsFalse || countCorrectAnswers.length !== answerIsCorrect.length) {
      try {
        this.model.die();
        user.add({result: false, time: this.model.state.time});
      } catch (e) {
        Application.showFailTries();
        return;
      }
    } else {
      user.add({result: true, time: this.model.state.time});
    }

    this.hasNextLevel();
  }

  answerArtist(answer) {
    this.stopTimer();

    if (answer.value === `false`) {
      try {
        this.model.die();
        user.add({result: false, time: this.model.state.time});
      } catch (e) {
        Application.showFailTries();
        return;
      }
    } else {
      user.add({result: true, time: this.model.state.time});
    }

    this.hasNextLevel();
  }

  hasNextLevel() {
    if (this.model.hasNextLevel()) {
      this.model.nextLevel();
      this.gameLevel(this.model.levelGame);
      this.changeLevel(this.level);
      this.updateHeader();
      this.startTimer();
    } else {
      this.model.gameUser = {
        score: countPoints([...user], this.model.state.lives),
        lives: this.model.state.lives,
        time: this.model.state.time,
      };

      Application.showResult(this.model);
    }
  }

  changeContentView(view) {
    view.element.firstElementChild.insertBefore(this.header.element, view.element.firstElementChild.firstElementChild);
    this.root.replaceChild(view.element, this.root.firstElementChild);
  }
}
