export default class EmptyFieldsError extends Error {
  constructor(message: string) {
    super(message);
    this.stack = '400';
  }
}
