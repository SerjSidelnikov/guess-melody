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
