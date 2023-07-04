export class ESportError {
  constructor(
    public readonly message: string,
    public readonly code?: number,
    public readonly data?: unknown
  ) {}
}
