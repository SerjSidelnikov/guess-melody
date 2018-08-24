import {assert} from 'chai';
import {resultGame} from './result-game';

describe(`Player result output`, () => {
  const timeout = `Время вышло! Вы не успели отгадать все мелодии.`;
  const attemptsToEnd = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

  it(`Lose - time is running out.`, () => {
    assert.equal(resultGame([4, 5, 8, 10, 11], {score: 6, lives: 3, time: 0}), timeout);
    assert.equal(resultGame([4, 10, 11], {score: 3, lives: 3, time: 0}), timeout);
    assert.equal(resultGame([4], {score: 1, lives: 3, time: 0}), timeout);
  });

  it(`Lose - all attempts are over.`, () => {
    assert.equal(resultGame([4, 5, 8, 10, 11], {score: 6, lives: 0, time: 40}), attemptsToEnd);
    assert.equal(resultGame([4, 10, 11], {score: 3, lives: 0, time: 90}), attemptsToEnd);
    assert.equal(resultGame([], {score: 1, lives: 0, time: 60}), attemptsToEnd);
  });

  it(`Winnings.`, () => {
    assert.equal(resultGame([4, 5, 8, 10, 12], {score: 11, lives: 2, time: 40}), `Вы заняли 2 место из 6. Это лучше чем у 67% игроков.`);
    assert.equal(resultGame([4, 5, 8, 10, 11], {score: 12, lives: 3, time: 90}), `Вы заняли 1 место из 6. Это лучше чем у 83% игроков.`);
    assert.equal(resultGame([4, 8, 10, 11], {score: 5, lives: 1, time: 60}), `Вы заняли 4 место из 5. Это лучше чем у 20% игроков.`);
  });
});
