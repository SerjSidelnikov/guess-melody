import AbstractView from '../abstract-view';

export default class SplashScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div>
        <img class="splash-screen" src="./img/ajax-loader.gif" alt="загрузка" width="140" height="140">
      </div>`;
  }

  bind() {
    //
  }
}
