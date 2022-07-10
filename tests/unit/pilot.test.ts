import { faker } from '@faker-js/faker';
import { Contract } from '../../src/domain/contract';
import { ResourcesEnum } from '../../src/domain/enums/resources.enum';
import { Resource } from '../../src/domain/resource';
import { PlanetsEnum } from '../../src/domain/enums/planets.enum';
import { DomainException } from '../../src/domain/exception/domain.exception';
import { Pilot } from '../../src/domain/pilot';

describe('Pilot test', () => {
  describe('should trhow domain exception when one or more attributes are not provided', () => {
    const pilot = {
      certification: faker.random.numeric(7),
      name: faker.name.findName(),
      age: faker.datatype.number({
        min: 18,
        max: 65,
      }),
      credits: faker.datatype.number(),
      currentPlanet: PlanetsEnum.ANDVARI,
    };

    const pilotFixture = () =>
      new Pilot(
        pilot.certification,
        pilot.name,
        pilot.age,
        pilot.credits,
        pilot.currentPlanet,
      );

    class Payload {
      public readonly certification = pilot.certification;
      public readonly name = pilot.name;
      public readonly age = pilot.age;
      public readonly credits = pilot.credits;
      public readonly currentPlanet = pilot.currentPlanet;
    }

    const pilotsPayload = new Payload();

    const pilots = [...Object.keys(pilotsPayload)].map((key) => {
      const payload = new Payload();
      delete payload[key];

      return [[payload as any]];
    });

    it.each(pilots)(
      'missing information should throw DomainException',
      ([body]) => {
        const res = () => {
          new Pilot(
            body.certification,
            body.name,
            body.age,
            body.credits,
            body.currentPlanet,
          );
        };

        expect(res).toThrow(DomainException);
      },
    );

    it('should throw an exception when certification requirements are not met', () => {
      const res = () => {
        new Pilot(
          '123456',
          pilot.name,
          pilot.age,
          pilot.credits,
          pilot.currentPlanet,
        );
      };

      expect(res).toThrow(DomainException);
    });

    it('should throw an exception when name requirement is not met', () => {
      const res = () => {
        new Pilot(
          pilot.certification,
          '',
          pilot.age,
          pilot.credits,
          pilot.currentPlanet,
        );
      };

      expect(res).toThrow(DomainException);
    });

    it('should throw an exception when age requirement is not met', () => {
      const res = () => {
        new Pilot(
          pilot.certification,
          pilot.name,
          16,
          pilot.credits,
          pilot.currentPlanet,
        );
      };

      expect(res).toThrow(DomainException);
    });

    it('should create a pilot with valid information', () => {
      const newPilot = pilotFixture();

      expect(newPilot).toBeInstanceOf(Pilot);
    });

    it('should adjust pilot`s credits after earning a contract', () => {
      const newPilot = pilotFixture();

      newPilot.earnContract(
        new Contract(
          'Description',
          [new Resource(ResourcesEnum.FOOD, 50)],
          PlanetsEnum.ANDVARI,
          PlanetsEnum.AQUA,
          500,
        ),
      );

      expect(newPilot.getCredits()).toBe(pilot.credits + 500);
    });
  });
});
