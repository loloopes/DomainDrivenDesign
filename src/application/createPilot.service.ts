import { Inject, Injectable } from '@nestjs/common';
import { PlanetsEnum } from '../domain/enums/planets.enum';
import { PilotRepositoryInterface } from '../domain/interface/pilotRepositoryInterface';
import { Pilot } from '../domain/pilot';
import { CreatePilotDTO } from './dto/createPilotDTO';

@Injectable()
export class CreatePilotService {
  constructor(
    @Inject('PilotRepository')
    private readonly pilotRepository: PilotRepositoryInterface,
  ) {}

  public async createPilot(createPilotDTO: CreatePilotDTO): Promise<any> {
    const newPilot = new Pilot(
      createPilotDTO.certification,
      createPilotDTO.name,
      createPilotDTO.age,
      createPilotDTO.credits,
      PlanetsEnum[createPilotDTO.current_plane],
    );

    await this.pilotRepository.createOrUpdate(newPilot);
  }
}
