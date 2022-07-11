import { Transform } from 'class-transformer';
import { IsString, Length, Max, Min } from 'class-validator';

export class CreateContractRequest {
  @Transform(({ value }) => value.trim())
  @Length(1, 224)
  description: string;

  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(1000000)
  payloadId: number;

  @Transform(({ value }) => value.trim())
  @Length(1, 224)
  origin: string;

  @Transform(({ value }) => value.trim())
  @Length(1, 224)
  destination: string;

  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(1000000)
  value: number;
}
