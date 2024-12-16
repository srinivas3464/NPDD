import { IndianNumberPipe } from './indian-number.pipe';

describe('IndianNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new IndianNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
