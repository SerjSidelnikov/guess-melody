import {assert} from 'chai';
import {createTimer} from './timer';

describe(`Creating a timer`, () => {

  it(`Correct input data`, () => {
    assert.throws(() => createTimer(`300`), /A number must be transmitted/);
    assert.throws(() => createTimer({}), /A number must be transmitted/);
    assert.throws(() => createTimer([]), /A number must be transmitted/);
    assert.throws(() => createTimer(-2), /The number must be greater than zero/);
  });

  it(`Time decreases`, () => {
    const newTimer = createTimer(5);
    newTimer.tick();
    assert.equal(newTimer.timer, 4);
    newTimer.tick();
    assert.equal(newTimer.timer, 3);
    newTimer.tick();
    assert.equal(newTimer.timer, 2);
    newTimer.tick();
    assert.equal(newTimer.timer, 1);
  });

  it(`Time is over`, () => {
    const newTimer = createTimer(2);
    newTimer.tick();
    assert.throws(() => newTimer.tick(), /Time is over/);
  });
});
