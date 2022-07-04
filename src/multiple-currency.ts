export class Dollar {
  private amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public times(multiplier: number) {
    return new Dollar(this.amount * multiplier);
  }

  public equals(object: Object) {
    const dollar = object as Dollar;
    return this.amount === dollar.amount;
  }
}
