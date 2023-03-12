export default class NonExistentTeamId extends Error {
  constructor(message: string) {
    super(message);
    this.stack = '404';
  }
}
