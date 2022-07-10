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
import { CreatePilotService } from '../../application/createPilot.service';
import { CreateShipService } from '../../application/createShip.service';
import { CreatePilotDTO } from '../../application/dto/createPilotDTO';
import { AppService } from '../../application/app.service';
import { CreatePilotRequest } from './request/createPilot.request';
import { CreateShipRequest } from './request/createShip.request';
import { CreateShipDTO } from 'src/application/dto/createShipDTO';

@Controller()
export class AppController {
  constructor(
    @Inject(AppService)
    private readonly appService: AppService,
    @Inject(CreatePilotService)
    private readonly createPilotService: CreatePilotService,
    @Inject(CreateShipService)
    private readonly createShipService: CreateShipService,
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
    await this.createPilotService.createPilot(
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
    await this.createShipService.createShip(
      new CreateShipDTO(body.fuelCapacity, body.fuelLevel, body.cargoCapacity),
    );

    return response.status(HttpStatus.OK).send(body);
  }
}
