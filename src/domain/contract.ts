import { PlanetsEnum } from './enums/planets.enum';
import { DomainException } from './exception/domain.exception';
import { Resource } from './resource';

export class Contract {
  constructor(
    private readonly description: string,
    private readonly payload: Resource[],
    private readonly origin: PlanetsEnum,
    private readonly destination: PlanetsEnum,
    private readonly value: number,
  ) {
    this.validate();
  }

  validate(): void {
    if (!this.description || this.description.length < 1) {
      throw new DomainException('Decription field should be valid string');
    }

    if (!this.payload || this.payload.length < 1) {
      throw new DomainException('Contract must have a valid resource');
    }

    if (!this.origin || !Object.values(PlanetsEnum).includes(this.origin)) {
      throw new DomainException('Origin must be a valid planet');
    }

    if (
      !this.destination ||
      !Object.values(PlanetsEnum).includes(this.destination)
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
