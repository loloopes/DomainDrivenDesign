import { DomainException } from './exception/domain.exception';

export class Ship {
  constructor(
    private readonly fuelCapacity: number,
    private readonly cargoCapacity: number,
    private readonly fuelLevel: number,
  ) {
    this.validate();
  }

  public getFuelCapacity(): number {
    return this.fuelCapacity;
  }

  public getCargoCapacity(): number {
    return this.cargoCapacity;
  }

  public getFuelLevel(): number {
    return this.fuelLevel;
  }

  private validate(): void {
    if (!this.fuelCapacity || this.fuelCapacity < 0) {
      throw new DomainException('Fuel capacity must a valid positive number');
    }

    if (
      !this.fuelLevel ||
      this.fuelLevel < 0 ||
      this.fuelLevel > this.fuelCapacity
    ) {
      throw new DomainException(
        'Fuel capacity must be a positive number and may not surpass fuel capacity',
      );
    }

    if (!this.cargoCapacity || this.cargoCapacity < 0) {
      throw new DomainException('Cargo capacity cannot be a negative number');
    }
  }
}
