import { Contract } from '../../src/domain/contract';
import { PlanetsEnum } from '../../src/domain/enums/planets.enum';
import { ResourcesEnum } from '../../src/domain/enums/resources.enum';
import { DomainException } from '../../src/domain/exception/domain.exception';
import { Resource } from '../../src/domain/resource';

describe('Contract test', () => {
  const contract = {
    decription: 'A contract',
    payloadId: 2,
    origin: PlanetsEnum.AQUA,
    destination: PlanetsEnum.DEMETER,
    value: 500,
  };

  class Payload {
    public readonly description = contract.decription;
    public readonly payload = contract.payloadId;
    public readonly origin = contract.origin;
    public readonly destination = contract.destination;
    public readonly value = contract.value;
  }

  const contractsPayload = new Payload();

  const contracts = [...Object.keys(contractsPayload)].map((key) => {
    const payload = new Payload();
    delete payload[key];

    return [[payload as any]];
  });

  it.each(contracts)(
    'missing information should throw DomainException',
    ([body]) => {
      const res = () => {
        new Contract(
          body.decription,
          body.payload,
          body.origin,
          body.destination,
          body.value,
        );
      };

      expect(res).toThrow(DomainException);
    },
  );

  it('should throw an exception when attempt to create a contract without its description', () => {
    const res = () => {
      new Contract(
        '',
        contract.payloadId,
        contract.origin,
        contract.destination,
        contract.value,
      );
    };

    expect(res).toThrow(DomainException);
  });

  it('should throw an exception when attempt to create a contract without its payload', () => {
    const res = () => {
      new Contract(
        contract.decription,
        null,
        contract.origin,
        contract.destination,
        20,
      );
    };

    expect(res).toThrow(DomainException);
  });

  it('should throw an exception when attempt to create a contract with negative value', () => {
    const res = () => {
      new Contract(
        contract.decription,
        contract.payloadId,
        contract.origin,
        contract.destination,
        -20,
      );
    };

    expect(res).toThrow(DomainException);
  });

  it('should successfully create a contract', () => {
    const newContract = new Contract(
      contract.decription,
      contract.payloadId,
      contract.origin,
      contract.destination,
      contract.value,
    );

    expect(newContract).toBeInstanceOf(Contract);
    expect(newContract.getValue()).toBe(contract.value);
  });
});
