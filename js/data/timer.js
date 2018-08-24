/**
 * Функция создания таймера
 * @param {Number} time
 * @return {Object}
 */
export const createTimer = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`A number must be transmitted`);
  }

  if (time < 0) {
    throw new Error(`The number must be greater than zero`);
  }

  return {
    timer: time,

    tick() {
      this.timer -= 1;

      if (this.timer === 0) {
        throw new Error(`Time is over`);
      }
    }
  };
};
