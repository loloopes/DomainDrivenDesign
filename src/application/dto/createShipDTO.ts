export class CreateShipDTO {
  constructor(
    public readonly fuel_capacity: number,
    public readonly fuel_level: number,
    public readonly cargo_capacity: number,
  ) {}
}
