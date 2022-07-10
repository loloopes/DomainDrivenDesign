import { Contract } from './contract';
import { PlanetsEnum } from './enums/planets.enum';
import { DomainException } from './exception/domain.exception';

export class Pilot {
  constructor(
    private readonly certification: string,
    private readonly name: string,
    private readonly age: number,
    private credits: number,
    private readonly currentPlanet: PlanetsEnum,
  ) {
    this.validate();
  }

  public earnContract(contract: Contract): void {
    this.adjustBalance(contract.getValue());
  }

  public getCredits(): number {
    return this.credits;
  }

  private adjustBalance(credits: number) {
    this.credits += credits;
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
