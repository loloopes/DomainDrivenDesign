import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from 'src/domain/contract';
import { Repository } from 'typeorm';
import { ContractEntity } from '../entities/contract.entity';

export class ContractRepository {
  constructor(
    @InjectRepository(ContractEntity)
    private contractRepository: Repository<ContractEntity>,
  ) {}

  async create(contract: Contract): Promise<void> {
    const newContract = this.contractRepository.create({
      description: contract.getDescription(),
      payload_id: contract.getPayloadId(),
      origin: contract.getOrigin(),
      destination: contract.getDestination(),
      value: contract.getValue(),
    });

    await this.contractRepository.save(newContract);

    console.log(newContract, 'saved');
  }
}
