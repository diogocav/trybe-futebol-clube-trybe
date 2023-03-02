export default class IdNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.stack = '404';
  }
}
