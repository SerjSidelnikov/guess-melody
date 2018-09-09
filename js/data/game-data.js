export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 300
});

export const tick = (game) => {
  const time = game.time - 1;

  return Object.assign({}, game, {
    time
  });
};

export const user = new Set();

export const canContinue = (game) => game.lives - 1 > 0;

export const die = (game) => {
  if (!canContinue(game)) {
    throw new Error(`You can't continue anymore`);
  }

  const lives = game.lives - 1;

  return Object.assign({}, game, {
    lives
  });
};

export const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`,
};
