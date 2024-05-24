import { run } from './utils/server';

if (process.env.NODE_ENV !== 'testing') {
  run();
}
