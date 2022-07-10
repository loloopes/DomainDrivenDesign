import { Transform } from 'class-transformer';
import { Length, Max, Min } from 'class-validator';

export class CreatePilotRequest {
  @Transform(({ value }) => value.trim())
  @Length(1, 224)
  certification: string;

  @Transform(({ value }) => value.trim())
  @Length(1, 224)
  name: string;

  @Transform(({ value }) => Number(value))
  @Min(18)
  @Max(150)
  age: number;

  @Transform(({ value }) => value.trim())
  @Length(1, 224)
  currentPlanet: string;

  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(10000000000)
  credits: number;
}
