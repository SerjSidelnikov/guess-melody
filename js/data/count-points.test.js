import {assert} from 'chai';
import {countPoints} from './count-points';

describe(`Scoring player points`, () => {
  it(`Should return -1 if the player answers less than 10 questions.`, () => {
    assert.equal(countPoints([
      {result: false, time: 60},
      {result: false, time: 60},
      {result: false, time: 60},
    ], 0), -1);

    assert.equal(countPoints([
      {result: false, time: 60},
      {result: false, time: 60},
      {result: true, time: 20},
      {result: true, time: 30},
      {result: false, time: 60},
    ], 0), -1);
  });

  it(`Should return 10 if the player answered all the questions correctly and not quickly.`, () => {
    assert.equal(countPoints([
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 30},
    ], 3), 10);
  });

  it(`Different options for answers and time.`, () => {
    assert.equal(countPoints([
      {result: true, time: 20},
      {result: false, time: 30},
      {result: true, time: 10},
      {result: true, time: 13},
      {result: true, time: 30},
      {result: true, time: 15},
      {result: false, time: 30},
      {result: true, time: 24},
      {result: true, time: 11},
      {result: true, time: 6},
    ], 1), 11);

    assert.equal(countPoints([
      {result: true, time: 20},
      {result: false, time: 30},
      {result: true, time: 10},
      {result: true, time: 13},
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 30},
      {result: true, time: 24},
      {result: true, time: 11},
      {result: true, time: 30},
    ], 2), 12);
  });

  it(`Valid data must be provided`, () => {
    assert.throws(() => countPoints({}, 0), /The first parameter must be an array/);
    assert.throws(() => countPoints([], `a`), /The second parameter must be a number/);
    assert.throws(() => countPoints([], -1), /The second parameter must be a positive number/);
  });
});
