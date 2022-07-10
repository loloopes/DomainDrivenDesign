import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../../application/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
      migrationsRun: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
