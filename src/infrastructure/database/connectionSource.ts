import { DataSource } from 'typeorm';
import 'reflect-metadata';

export const connectionSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  password: 'my-secret-pw',
  username: 'root',
  port: 3306,
  database: 'SCP',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/**/*.migration{.ts,.js}'],
});
