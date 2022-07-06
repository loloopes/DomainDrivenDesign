import { faker } from '@faker-js/faker';
import { Domain } from 'domain';
import { DomainException } from '../../src/domain/exception/domain.exception';
import { Ship } from '../../src/domain/ship';

describe('Ship test', () => {
  describe('should throw domain exception when one or more attributes are not provided', () => {
    const fuelCap = faker.datatype.number({ max: 100, min: 50 });
    const cargoCap = faker.datatype.number({ max: 60, min: 30 });

    const ship = {
      fuelCapacity: fuelCap,
      cargoCapacity: cargoCap,
      fuelLevel: fuelCap,
    };

    class Payload {
      public readonly fuelCapacity = fuelCap;
      public readonly cargoCapacity = cargoCap;
      public readonly fuelLevel = fuelCap;
    }

    const shipsPayload = new Payload();

    const ships = [...Object.keys(shipsPayload)].map((key) => {
      const payload = new Payload();
      delete payload[key];

      return [[payload as any]];
    });

    it.each(ships)(
      'missing information should trhow DomainException',
      ([body]) => {
        const res = () => {
          new Ship(body.fuelCapacity, body.cargoCapacity, body.fuelLevel);
        };

        expect(res).toThrow(DomainException);
      },
    );

    it('should throw an exception when attempt to create a ship with negative fuel capacity', () => {
      const res = () => {
        new Ship(-5, ship.cargoCapacity, ship.fuelLevel);
      };

      expect(res).toThrow(DomainException);
    });

    it('should throw an exception when attempt to create a ship with ful level superior to fuel capacity', () => {
      const res = () => {
        new Ship(ship.fuelCapacity, ship.cargoCapacity, ship.fuelCapacity + 1);
      };

      expect(res).toThrow(DomainException);
    });

    it('should throw an exception when attempt to create a ship with negative fuel level', () => {
      const res = () => {
        new Ship(ship.fuelCapacity, ship.cargoCapacity, -1);
      };

      expect(res).toThrow(DomainException);
    });

    it('should throw an exception when attempt to create a ship with negative cargo capacity', () => {
      const res = () => {
        new Ship(ship.fuelCapacity, -1, ship.fuelLevel);
      };

      expect(res).toThrow(DomainException);
    });

    it('should successfully create a ship if all information is valid', () => {
      const newShip = new Ship(
        ship.fuelCapacity,
        ship.cargoCapacity,
        ship.fuelLevel,
      );

      expect(newShip).toBeInstanceOf(Ship);
    });
  });
});
