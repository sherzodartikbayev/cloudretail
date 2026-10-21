export class HttpError extends Error {
  constructor(
    public readonly status: number,
    readonly message: string,
  ) {
    super(message);
  }
}
