import sum from './sum.js';

describe('sun', () => {
  test('1 + 2 should be 3', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});
