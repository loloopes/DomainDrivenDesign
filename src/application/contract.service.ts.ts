import { Inject, Injectable } from '@nestjs/common';
import { Contract } from '../domain/contract';
import { ContractRepositoryInterface } from '../domain/interface/contractRepositoryInterface';
import { CreateContractDTO } from './dto/createContractDTO';

@Injectable()
export class ContractService {
  constructor(
    @Inject('ContractRepository')
    private readonly contractRepository: ContractRepositoryInterface,
  ) {}

  public async createContract(
    createContractDTO: CreateContractDTO,
  ): Promise<void> {
    const newContract = new Contract(
      createContractDTO.description,
      createContractDTO.payloadId,
      createContractDTO.origin,
      createContractDTO.destination,
      createContractDTO.value,
    );

    await this.contractRepository.create(newContract);
  }
}
