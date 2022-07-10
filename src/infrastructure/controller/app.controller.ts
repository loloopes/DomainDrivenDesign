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
import { CreatePilotService } from 'src/application/createPilot.service';
import { CreatePilotDTO } from 'src/application/dto/createPilotDTO';
import { AppService } from '../../application/app.service';
import { CreatePilotRequest } from './request/createPilot.request';

@Controller()
export class AppController {
  constructor(
    @Inject(AppService)
    private readonly appService: AppService,
    @Inject(CreatePilotService)
    private readonly createPilotService: CreatePilotService,
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

    return response.status(HttpStatus.OK).send(body);
  }
}
