import { Bank, Expression, Money, Sum } from "./multiple-currency";

describe("다중 화폐 예제", () => {
  test("multiplication", () => {
    const five = Money.dollar(5);
    // NOTE: Expression 클래스로 변경 후, equals가 없다는 오류가 나서 순서를 변경함
    expect(Money.dollar(10).equals(five.times(2))).toBe(true);
    expect(Money.dollar(15).equals(five.times(3))).toBe(true);
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
    // NOTE: Expression 클래스로 변경 후, augend는 equals가 없다는 오류가 나서 순서를 변경함
    expect(five.equals(sum.augend)).toBe(true);
    expect(five.equals(sum.addend)).toBe(true);
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

  test("mixed addition", () => {
    const fiveBucks = Money.dollar(5) as Expression;
    const tenFrancs = Money.franc(10) as Expression;
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const result = bank.reduce(fiveBucks.plus(tenFrancs), "USD");
    expect(result.equals(Money.dollar(10))).toBe(true);
  });

  test("sum plus money", () => {
    const fiveBucks = Money.dollar(5) as Expression;
    const tenFrancs = Money.franc(10) as Expression;
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);
    const result = bank.reduce(sum, "USD");
    expect(result.equals(Money.dollar(15))).toBe(true);
  });

  test("sum times", () => {
    const fiveBucks = Money.dollar(5) as Expression;
    const tenFrancs = Money.franc(10) as Expression;
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const sum = new Sum(fiveBucks, tenFrancs).times(2);
    const result = bank.reduce(sum, "USD");
    expect(result.equals(Money.dollar(20))).toBe(true);
  });

  test("plus same currency returns money", () => {
    const sum = Money.dollar(1).plus(Money.dollar(1));
    expect(sum instanceof Money).toBe(true);
  });
});
