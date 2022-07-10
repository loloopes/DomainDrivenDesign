import { Inject, Injectable } from '@nestjs/common';
import { ShipRepositoryInterface } from 'src/domain/interface/shipRepositoryInterface';
import { Ship } from 'src/domain/ship';
import { CreateShipDTO } from './dto/createShipDTO';

@Injectable()
export class CreateShipService {
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
