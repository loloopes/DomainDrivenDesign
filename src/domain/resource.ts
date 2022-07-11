import { ResourcesEnum } from './enums/resources.enum';
import { DomainException } from './exception/domain.exception';

export class Resource {
  constructor(private readonly name: string, private readonly weight: number) {
    this.validate();
  }

  validate(): void {
    if (
      !this.name ||
      !Object.values(ResourcesEnum).includes(this.name as ResourcesEnum)
    ) {
      throw new DomainException(
        `Resources must be defined, types are ${ResourcesEnum.FOOD}, ${ResourcesEnum.MINERALS} or ${ResourcesEnum.WATER}`,
      );
    }

    if (!this.weight || this.weight < 1) {
      throw new DomainException(
        'Resource weight can neither be null nor negative',
      );
    }
  }
}
