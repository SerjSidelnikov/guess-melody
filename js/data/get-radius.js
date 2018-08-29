/**
 * Функция написания ндикатора
 * @param {Number} ratio
 * @param {Number} radius
 * @return {{stroke: number, offset: number}}
 */
export const getRadius = (ratio, radius) => {
  const stroke = Math.round(2 * Math.PI * radius);
  const offset = stroke - Math.round(stroke * ratio);

  return {
    stroke,
    offset,
  };
};
