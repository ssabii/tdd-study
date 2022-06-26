import { Dollar } from "./multiple-currency";

describe("다중 화폐 예제", () => {
  test("multiplication", () => {
    const five = new Dollar(5);

    five.times(2);
    expect(five.amount).toBe(10);
  });
});
