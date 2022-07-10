import { InjectRepository } from '@nestjs/typeorm';
import { Pilot } from '../../domain/pilot';
import { Repository } from 'typeorm';
import { PilotEntity } from '../entities/pilot.entity';
export class PilotRepository {
  constructor(
    @InjectRepository(PilotEntity)
    private pilotRepository: Repository<PilotEntity>,
  ) {}

  async createOrUpdate(pilot: Pilot): Promise<any> {
    const newPilot = this.pilotRepository.create({
      certification: pilot.getCertification(),
      name: pilot.getName(),
      age: pilot.getAge(),
      credits: pilot.getCredits(),
      current_planet: pilot.getCurrentPlane(),
    });

    await this.pilotRepository.save(newPilot);
  }
}
