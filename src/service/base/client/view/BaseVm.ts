export abstract class BaseVm {
  constructor(
    public readonly id: number,
    public readonly createdAt,
    public readonly updatedAt
  ) {}
}
