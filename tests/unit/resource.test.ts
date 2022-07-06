import { faker } from '@faker-js/faker';
import { ResourcesEnum } from '../../src/domain/enums/resources.enum';
import { DomainException } from '../../src/domain/exception/domain.exception';
import { Resource } from '../../src/domain/resource';

describe('Resource test', () => {
  describe('should throw domain exception when one or more attributes are not provided', () => {
    const resource = {
      name: ResourcesEnum.FOOD,
      weight: faker.datatype.number({ min: 20, max: 40 }),
    };

    class Payload {
      public readonly name = resource.name;
      public readonly weight = resource.weight;
    }

    const resourcesPayload = new Payload();

    const resources = [...Object.keys(resourcesPayload)].map((key) => {
      const payload = new Payload();
      delete payload[key];

      return [[payload as any]];
    });

    it.each(resources)(
      'missing information should throw DomainException',
      ([body]) => {
        const res = () => {
          new Resource(body.name, body.weight);
        };

        expect(res).toThrow(DomainException);
      },
    );

    it('should throw a DomainException when attempt to create a resource with negative weight', () => {
      const res = () => {
        new Resource(resource.name, -54);
      };

      expect(res).toThrow(DomainException);
    });

    it('should throw successfully create a resource with valid data', () => {
      const newResource = new Resource(resource.name, resource.weight);

      expect(newResource).toBeInstanceOf(Resource);
    });
  });
});
