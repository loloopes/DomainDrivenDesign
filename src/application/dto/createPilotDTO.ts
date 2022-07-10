export class CreatePilotDTO {
  constructor(
    public readonly certification: string,
    public readonly name: string,
    public readonly age: number,
    public readonly current_plane: string,
    public readonly credits: number,
  ) {}
}
