import {assert} from 'chai';
import {subtractLife} from './subtract-life';

describe(`Managing player lives`, () => {

  it(`Should subtract one life.`, () => {
    assert.deepEqual(subtractLife({score: 6, lives: 3, time: 150}), {score: 6, lives: 2, time: 150});
    assert.deepEqual(subtractLife({score: 2, lives: 2, time: 60}), {score: 2, lives: 1, time: 60});
  });

  it(`Should to report if life ended.`, () => {
    assert.throws(() => subtractLife({score: 12, lives: 1, time: 30}), /Life ended/);
  });
});
