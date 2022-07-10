import { Transform } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class CreateShipRequest {
  @Transform(({ value }) => Number(value))
  @Min(20)
  @Max(300)
  fuelCapacity: number;

  @Transform(({ value }) => Number(value))
  @Min(0)
  @Max(300)
  fuelLevel: number;

  @Transform(({ value }) => Number(value))
  @Min(10)
  @Max(300)
  cargoCapacity: number;
}
