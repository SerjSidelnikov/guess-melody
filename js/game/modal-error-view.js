import AbstractView from '../abstract-view';

export default class ModalErrorView extends AbstractView {
  constructor(status) {
    super();
    this.status = status;
  }

  get template() {
    return `
      <section class="modal">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text">Статус: ${this.status}. Пожалуйста, перезагрузите страницу.</p>
      </section>`;
  }

  bind() {
    //
  }
}
