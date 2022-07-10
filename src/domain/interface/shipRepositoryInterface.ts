import { Ship } from '../ship';

export interface ShipRepositoryInterface {
  create(ship: Ship): Promise<void>;
}
