/**
 * Отнимает жизнь у игрока
 * @param {Object} user
 * @return {Object}
 */
export const subtractLife = (user) => {
  const newUser = Object.assign({}, user);
  newUser.lives -= 1;

  if (newUser.lives === 0) {
    throw new Error(`Life ended`);
  }

  return newUser;
};
