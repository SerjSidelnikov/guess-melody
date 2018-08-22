/**
 * Функция вывода результата игрока
 * @param {Array} statistics
 * @param {Object} user
 * @return {string}
 */
export const resultGame = (statistics, user) => {
  if (user.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии.`;
  }

  if (user.lives === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  statistics.push(user.score);
  const sortStat = statistics.sort((a, b) => a - b);
  const placeUser = statistics.length - sortStat.indexOf(user.score);
  const percent = (((statistics.length - placeUser) / statistics.length) * 100).toFixed(0);

  return `Вы заняли ${placeUser} место из ${statistics.length}. Это лучше чем у ${percent}% игроков.`;
};
