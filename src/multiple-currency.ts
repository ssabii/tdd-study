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

  public times(multiplier: number): Money {
    return new Money(this._amount * multiplier, this._currency);
  }

  public plus(addend: Money): Expression {
    return new Sum(this, addend);
  }

  reduce(to: string): Money {
    return this;
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
  reduce(to: string): Money;
}

export class Bank {
  public reduce(source: Expression, to: string): Money {
    return source.reduce(to);
  }
}

export class Sum implements Expression {
  public augend: Money;
  public addend: Money;

  constructor(augend: Money, addend: Money) {
    this.augend = augend;
    this.addend = addend;
  }

  public reduce(to: string) {
    const amount = this.augend.amount + this.addend.amount;
    return new Money(amount, to);
  }
}
