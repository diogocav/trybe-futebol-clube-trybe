export default class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.stack = '401';
  }
}
