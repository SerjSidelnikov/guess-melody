import AbstractView from '../abstract-view';

export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="modal modal--hidden">
        <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__buttons">
          <button class="modal__button button" id="ok">Ок</button>
          <button class="modal__button button" id="cancel">Отмена</button>
        </div>
      </section>`;
  }

  bind() {
    const closeButton = this.element.querySelector(`.modal__close`);
    const cancelButton = this.element.querySelector(`#cancel`);
    const confirmButton = this.element.querySelector(`#ok`);

    const cancelHandler = (event) => {
      event.preventDefault();

      this.onCancel();
    };

    closeButton.addEventListener(`click`, cancelHandler);
    cancelButton.addEventListener(`click`, cancelHandler);

    confirmButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onConfirm();
    });
  }

  onCancel() {
  }

  onConfirm() {
  }
}
