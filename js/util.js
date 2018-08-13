/**
 * Создаёт DOM-элемент на основе переданной разметки
 * @param {String} template
 * @return {HTMLElement}
 */
export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`section`);
  wrapper.className = `main`;
  wrapper.innerHTML = template;
  return wrapper;
};

const mainElement = document.querySelector(`.app`);

/**
 * Отображает экран переданного элемента
 * @param {HTMLElement} element
 */
export const showScreen = (element) => {
  mainElement.replaceChild(element, mainElement.firstElementChild);
};
