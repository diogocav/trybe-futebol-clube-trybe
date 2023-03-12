export default class InvalidTeamIdError extends Error {
  constructor(message: string) {
    super(message);
    this.stack = '422';
  }
}
