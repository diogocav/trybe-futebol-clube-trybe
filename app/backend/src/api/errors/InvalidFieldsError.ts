export default class InvalidFieldsError extends Error {
  constructor(message: string) {
    super(message);
    this.stack = '401';
  }
}
