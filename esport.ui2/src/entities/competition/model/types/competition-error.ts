export class CompetitionError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
  }
}
