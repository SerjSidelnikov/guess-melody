import {assert} from 'chai';
import {INITIAL_GAME} from './game';
import {changeLevel} from './change-level';

describe(`Check level changer`, () => {

  it(`Should update level of the game.`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
  });

  it(`Should not allow set negative values.`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
  });

  it(`Must not exceed 10 levels.`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, 12).level, /The game has a maximum of 10 levels/);
  });

  it(`Should not allow set non number value.`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, /Level should be of type number/);
  });
});
