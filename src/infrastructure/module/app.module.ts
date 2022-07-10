import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PilotEntity } from '../entities/pilot.entity';
import { AppController } from '../controller/app.controller';
import { PilotRepository } from '../repository/pilot.repository';
import { CreatePilotService } from '../../application/createPilot.service';
import { AppService } from '../../application/app.service';
import { CreateShipService } from '../../application/createShip.service';
import { ShipRepository } from '../repository/ship.repository';
import { ShipEntity } from '../entities/ship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PilotEntity, ShipEntity]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'my-secret-pw',
      database: 'SCP',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/**/*.migration{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CreatePilotService,
    CreateShipService,
    {
      provide: 'PilotRepository',
      useClass: PilotRepository,
    },
    {
      provide: 'ShipRepository',
      useClass: ShipRepository,
    },
  ],
})
export class AppModule {}
