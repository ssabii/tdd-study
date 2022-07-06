export class Money {
  protected amount: number;
  protected _currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this._currency = currency;
  }

  static dollar(amount: number): Money {
    return new Dollar(amount, "USD");
  }

  static franc(amount: number): Money {
    return new Franc(amount, "CHF");
  }

  public times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this._currency);
  }

  public currency() {
    return this._currency;
  }

  public equals(object: Object) {
    const money = object as Money;
    return this.amount === money.amount && this.currency() === money.currency();
  }

  // 이건 굳이 작성안해도 되지 않을까?
  public toString(): string {
    return this.amount + "" + this._currency;
  }
}

export class Dollar extends Money {
  constructor(amount: number, currency: string) {
    super(amount, currency);
  }
}

export class Franc extends Money {
  constructor(amount: number, currency: string) {
    super(amount, currency);
  }
}
