export class AsyncError extends Error {
  res: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.res = res;
  }
}
