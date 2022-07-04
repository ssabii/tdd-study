export class Money {
  protected amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public equals(object: Object) {
    const money = object as Money;
    return this.amount === money.amount;
  }
}

export class Dollar extends Money {
  constructor(amount: number) {
    super(amount);
  }

  public times(multiplier: number) {
    return new Dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super(amount);
  }

  public times(multiplier: number) {
    return new Franc(this.amount * multiplier);
  }
}
