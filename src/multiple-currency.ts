export class Money implements Expression {
  protected _amount: number;
  protected _currency: string;

  constructor(amount: number, currency: string) {
    this._amount = amount;
    this._currency = currency;
  }

  static dollar(amount: number): Money {
    return new Money(amount, "USD");
  }

  static franc(amount: number): Money {
    return new Money(amount, "CHF");
  }

  // javascript에서는 클래스 외부에서 protected에 접근할 수 없기 때문에 만들어줌
  public get amount() {
    return this._amount;
  }

  public currency() {
    return this._currency;
  }

  public times(multiplier: number): Expression {
    return new Money(this._amount * multiplier, this._currency);
  }

  public plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  public reduce(bank: Bank, to: string): Money {
    const rate = bank.rate(this._currency, to);
    return new Money(this._amount / rate, to);
  }

  public equals(object: Object) {
    const money = object as Money;
    return (
      this._amount === money._amount && this.currency() === money.currency()
    );
  }

  // 이건 굳이 작성안해도 되지 않을까?
  public toString(): string {
    return this._amount + "" + this._currency;
  }
}

export interface Expression {
  reduce(bank: Bank, to: string): Money;
  plus(addend: Expression): Expression;
  times(multiplier: number): Expression;
}

export class Bank {
  private rates = new Map<string, number>();

  public reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }

  public rate(from: string, to: string): number {
    if (from === to) return 1;
    return this.rates.get(from + to);
  }

  public addRate(from: string, to: string, rate: number) {
    this.rates.set(from + to, rate);
  }
}

export class Sum implements Expression {
  public augend: Expression;
  public addend: Expression;

  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  public reduce(bank: Bank, to: string): Money {
    const amount =
      this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
    return new Money(amount, to);
  }

  public plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  public times(multiplier: number): Expression {
    return new Sum(
      this.augend.times(multiplier),
      this.addend.times(multiplier),
    );
  }
}

class Pair {
  private from: string;
  private to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  public equals(object: Object): boolean {
    const pair = object as Pair;
    return this.from === pair.from && this.to === pair.to;
  }

  public hashCode(): number {
    return 0;
  }
}
