import anyTest, { TestInterface } from 'ava';
import { uppercase } from './<%= nodename %>';

interface Context {

}

const test = anyTest as TestInterface<Context>;

test('core logic', (t) => {
  t.is(uppercase('Test'), 'TEST');
});
