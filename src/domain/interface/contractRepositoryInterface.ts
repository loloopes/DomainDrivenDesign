import { Contract } from '../contract';

export interface ContractRepositoryInterface {
  create(contract: Contract): Promise<void>;
}
