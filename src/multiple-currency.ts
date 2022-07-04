export abstract class Money {
  protected amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  static dollar(amount: number): Money {
    return new Dollar(amount);
  }

  static franc(amount: number): Money {
    return new Franc(amount);
  }

  abstract times(multiplier: number): Money;

  public equals(object: Object) {
    const money = object as Money;
    return (
      this.amount === money.amount && this.constructor === money.constructor
    );
  }
}

export class Dollar extends Money {
  constructor(amount: number) {
    super(amount);
  }

  public times(multiplier: number) {
    return new Dollar(this.amount * multiplier) as Money;
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super(amount);
  }

  public times(multiplier: number) {
    return new Franc(this.amount * multiplier) as Money;
  }
}
