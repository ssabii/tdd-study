import { fibonacci } from "./fibonacci";

describe("fibonacci", () => {
  test("fibonacci", () => {
    const cases = [
      [0, 0],
      [1, 1],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 5],
      [6, 8],
    ];

    cases.forEach(([n, expected]) => {
      expect(fibonacci(n)).toBe(expected);
    });
  });
});
