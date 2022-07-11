import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PilotEntity } from '../entities/pilot.entity';
import { AppController } from '../controller/app.controller';
import { PilotRepository } from '../repository/pilot.repository';
import { PilotService } from '../../application/pilot.serive.ts';
import { AppService } from '../../application/app.service';
import { ShipService } from '../../application/createShip.service';
import { ShipRepository } from '../repository/ship.repository';
import { ShipEntity } from '../entities/ship.entity';
import { connectionSource } from '../database/connectionSource';
import { ContractEntity } from '../entities/contract.entity';
import { ContractRepository } from '../repository/contract.repository';
import { ContractService } from '../../application/contract.service.ts';

@Module({
  imports: [
    TypeOrmModule.forFeature([PilotEntity, ShipEntity, ContractEntity]),
    TypeOrmModule.forRoot(connectionSource.options),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PilotService,
    ShipService,
    ContractService,
    {
      provide: 'PilotRepository',
      useClass: PilotRepository,
    },
    {
      provide: 'ShipRepository',
      useClass: ShipRepository,
    },
    {
      provide: 'ContractRepository',
      useClass: ContractRepository,
    },
  ],
})
export class AppModule {}
