/**
 * Создаёт DOM-элемент на основе переданной разметки
 * @param {String} template
 * @return {HTMLElement}
 */
export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const mainElement = document.querySelector(`.main`);

/**
 * Отображает экран переданного элемента
 * @param {HTMLElement} element
 */
export const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
