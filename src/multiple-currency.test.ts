import { Money, Dollar, Franc } from "./multiple-currency";

describe("다중 화폐 예제", () => {
  test("multiplication", () => {
    const five = Money.dollar(5);
    expect(five.times(2).equals(Money.dollar(10))).toBe(true);
    expect(five.times(3).equals(Money.dollar(15))).toBe(true);
  });

  test("equality", () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
    expect(Money.franc(5).equals(Money.franc(5))).toBe(true);
    expect(Money.franc(5).equals(Money.franc(6))).toBe(false);
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  });

  test("franc multiplication", () => {
    const five = Money.franc(5);
    expect(five.times(2).equals(Money.franc(10))).toBe(true);
    expect(five.times(3).equals(Money.franc(15))).toBe(true);
  });
});
