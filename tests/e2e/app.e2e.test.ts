import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from '../../src/infrastructure/module/app.module';
import { PilotService } from '../../src/application/pilot.serive.ts';
import { PilotEntity } from '../../src/infrastructure/entities/pilot.entity';

let app: INestApplication;
const pilotService = {
  createPilot: jest.fn(),
  pilotRepository: {
    create: jest.fn(),
  },
};

let pilotRepository: Repository<PilotEntity>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PilotService)
    .useValue(pilotService)
    .compile();

  pilotRepository = moduleFixture.get<Repository<PilotEntity>>(
    getRepositoryToken(PilotEntity),
  );

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();
});

afterAll(async () => {
  await app.close();
});

// afterEach(async () => {
//   await pilotRepository.remove({});
// });

describe('/POST create pilot (e2e)', () => {
  it('should return 202 and create a pilot', async () => {
    const bodyRequestPilotCreation = {
      certification: '1234564',
      name: 'sofa lofa',
      age: 18,
      currentPlanet: 'CALAS',
      credits: 1,
    };

    await request(app.getHttpServer())
      .post('/pilot')
      .send(bodyRequestPilotCreation)
      .expect(202);

    const newPilot = await pilotRepository.findOne({
      where: { name: bodyRequestPilotCreation.name },
    });

    expect(newPilot.name).toBe(bodyRequestPilotCreation.name);
  });
});
