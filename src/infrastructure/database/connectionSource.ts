import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { PilotEntity } from '../entities/pilot.entity';
import { ShipEntity } from '../entities/ship.entity';
import { ContractEntity } from '../entities/contract.entity';

export const connectionSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  password: 'my-secret-pw',
  username: 'root',
  port: 3306,
  database: 'SCP',
  entities: [PilotEntity, ShipEntity, ContractEntity],
  migrations: [__dirname + '/**/*.migration{.ts,.js}'],
});
