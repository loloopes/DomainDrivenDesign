import { Pilot } from '../pilot';

export interface PilotRepositoryInterface {
  create(pilot: Pilot): Promise<void>;
}
