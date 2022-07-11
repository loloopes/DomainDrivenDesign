import { Inject, Injectable } from '@nestjs/common';
import { ShipRepositoryInterface } from '../domain/interface/shipRepositoryInterface';
import { Ship } from '../domain/ship';
import { CreateShipDTO } from './dto/createShipDTO';
@Injectable()
export class ShipService {
  constructor(
    @Inject('ShipRepository')
    private readonly shipRepository: ShipRepositoryInterface,
  ) {}

  public async createShip(createShipDTO: CreateShipDTO): Promise<void> {
    const newShip = new Ship(
      createShipDTO.fuel_capacity,
      createShipDTO.cargo_capacity,
      createShipDTO.fuel_level,
    );

    await this.shipRepository.create(newShip);
  }
}
