import { Bank, Money, Sum } from "./multiple-currency";

describe("다중 화폐 예제", () => {
  test("multiplication", () => {
    const five = Money.dollar(5);
    expect(five.times(2).equals(Money.dollar(10))).toBe(true);
    expect(five.times(3).equals(Money.dollar(15))).toBe(true);
  });

  test("equality", () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  });

  test("currency", () => {
    expect(Money.dollar(1).currency()).toBe("USD");
    expect(Money.franc(1).currency()).toBe("CHF");
  });

  test("simple addition", () => {
    const five = Money.dollar(5);
    const sum = five.plus(five);
    const bank = new Bank();
    const reduced = bank.reduce(sum, "USD");
    expect(reduced.equals(Money.dollar(10))).toBe(true);
  });

  test("plus returns sum", () => {
    const five = Money.dollar(5);
    const result = five.plus(five);
    const sum = result as Sum;
    expect(sum.augend.equals(five)).toBe(true);
    expect(sum.addend.equals(five)).toBe(true);
  });

  test("reduce sum", () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4));
    const bank = new Bank();
    const result = bank.reduce(sum, "USD");
    expect(result.equals(Money.dollar(7))).toBe(true);
  });

  test("reduce money", () => {
    const bank = new Bank();
    const result = bank.reduce(Money.dollar(1), "USD");
    expect(result.equals(Money.dollar(1))).toBe(true);
  });

  test("reduce money different currency", () => {
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const result: Money = bank.reduce(Money.franc(2), "USD");
    expect(result.equals(Money.dollar(1))).toBe(true);
  });
});
