import { PlanetsEnum } from './enums/planets.enum';
import { DomainException } from './exception/domain.exception';

export class Contract {
  constructor(
    private readonly description: string,
    private readonly payloadId: number,
    private readonly origin: string,
    private readonly destination: string,
    private readonly value: number,
  ) {
    this.validate();
  }

  public getOrigin(): string {
    return this.origin;
  }

  public getValue(): number {
    return this.value;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPayloadId(): number {
    return this.payloadId;
  }

  public getDestination(): string {
    return this.destination;
  }

  validate(): void {
    if (!this.description || this.description.length < 1) {
      throw new DomainException('Decription field should be valid string');
    }

    if (!this.payloadId || this.payloadId < 1) {
      throw new DomainException('Contract must have a valid payload');
    }

    if (
      !this.origin ||
      !Object.values(PlanetsEnum).includes(this.origin as PlanetsEnum)
    ) {
      throw new DomainException('Origin must be a valid planet');
    }

    if (
      !this.destination ||
      !Object.values(PlanetsEnum).includes(this.destination as PlanetsEnum)
    ) {
      throw new DomainException('Destination must be a valid planet');
    }

    if (this.origin === this.destination) {
      throw new DomainException('Destination may not be the same as origin');
    }

    if (!this.value || this.value < 1) {
      throw new DomainException('Contract must have a positive value');
    }
  }
}
