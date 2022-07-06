import { PlanetsEnum } from './enums/planets.enum';
import { DomainException } from './exception/domain.exception';

export class Pilot {
  constructor(
    public readonly certification: string,
    public readonly name: string,
    public readonly age: number,
    public readonly credits: number,
    public readonly currentPlanet: PlanetsEnum,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.certification || this.certification.length !== 7) {
      throw new DomainException(
        'Certification field is required and should not be empty and equal to 6',
      );
    }

    if (!this.name || this.name.length < 1) {
      throw new DomainException(
        'Pilot name field is required and should not be empty',
      );
    }

    if (!this.age || this.age < 18) {
      throw new DomainException(
        'Field age should be a valid number, minimum flying age is 18',
      );
    }

    if (!this.credits) {
      throw new DomainException('Field credits must be a vlid number');
    }

    if (
      !this.currentPlanet ||
      !Object.values(PlanetsEnum).includes(this.currentPlanet as PlanetsEnum)
    ) {
      throw new DomainException(
        `Current planet must be either ${PlanetsEnum.ANDVARI}, ${PlanetsEnum.AQUA}, ${PlanetsEnum.CALAS} or ${PlanetsEnum.DEMETER}`,
      );
    }
  }
}
