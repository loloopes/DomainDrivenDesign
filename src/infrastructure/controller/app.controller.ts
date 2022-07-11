import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PilotService } from '../../application/pilot.serive.ts';
import { ShipService } from '../../application/createShip.service';
import { CreatePilotDTO } from '../../application/dto/createPilotDTO';
import { AppService } from '../../application/app.service';
import { CreatePilotRequest } from './request/createPilot.request';
import { CreateShipRequest } from './request/createShip.request';
import { CreateShipDTO } from '../../application/dto/createShipDTO';
import { CreateContractRequest } from './request/createContract.request';
import { ContractService } from '../../application/contract.service.ts';
import { CreateContractDTO } from '../../application/dto/createContractDTO';

@Controller()
export class AppController {
  constructor(
    @Inject(AppService)
    private readonly appService: AppService,
    @Inject(PilotService)
    private readonly pilotService: PilotService,
    @Inject(ShipService)
    private readonly shipService: ShipService,
    @Inject(ContractService)
    private readonly contractService: ContractService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/pilot')
  async createPilot(
    @Body() body: CreatePilotRequest,
    @Res() response: Response,
  ): Promise<Response> {
    await this.pilotService.createPilot(
      new CreatePilotDTO(
        body.certification,
        body.name,
        body.age,
        body.currentPlanet,
        body.credits,
      ),
    );

    return response.status(HttpStatus.ACCEPTED).send();
  }

  @Post('/ship')
  async createShip(
    @Body() body: CreateShipRequest,
    @Res() response: Response,
  ): Promise<Response> {
    await this.shipService.createShip(
      new CreateShipDTO(body.fuelCapacity, body.fuelLevel, body.cargoCapacity),
    );

    return response.status(HttpStatus.ACCEPTED).send();
  }

  @Post('/contract')
  async createContract(
    @Body() body: CreateContractRequest,
    @Res() response: Response,
  ): Promise<Response> {
    await this.contractService.createContract(
      new CreateContractDTO(
        body.description,
        body.payloadId,
        body.origin,
        body.destination,
        body.value,
      ),
    );

    return response.status(HttpStatus.OK).send(body);
  }
}
