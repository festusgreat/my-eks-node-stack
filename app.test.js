const calculateTotal = (price, quantity) => price * quantity;

describe('Basic Application Sanity Checks', () => {
  test('Should correctly calculate service metrics', () => {
    expect(calculateTotal(10, 3)).toBe(30);
  });
});
