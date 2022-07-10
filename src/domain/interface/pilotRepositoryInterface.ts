import { Pilot } from '../pilot';

export interface PilotRepositoryInterface {
  createOrUpdate(pilot: Pilot): Promise<any>;
}
