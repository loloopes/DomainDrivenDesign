export class CreateContractDTO {
  constructor(
    public readonly description: string,
    public readonly payloadId: number,
    public readonly origin: string,
    public readonly destination: string,
    public readonly value: number,
  ) {}
}
