import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipEntity } from '../entities/ship.entity';
import { Ship } from '../../domain/ship';

export class ShipRepository {
  constructor(
    @InjectRepository(ShipEntity)
    private shipRepository: Repository<ShipEntity>,
  ) {}

  async create(ship: Ship): Promise<void> {
    const newShip = this.shipRepository.create({
      cargo_capacity: ship.getCargoCapacity(),
      fuel_capacity: ship.getFuelCapacity(),
      fuel_level: ship.getFuelLevel(),
    });

    await this.shipRepository.save(newShip);
  }
}
