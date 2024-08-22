
export class UnknownRepositoryError extends Error {
  constructor(repositoryName: string, error: Error) {
    super(`Unknown repository: ${repositoryName}`);
    this.name = 'UnknownRepositoryError';
    this.stack = error.stack;
    this.message = error.message;
  }
}
