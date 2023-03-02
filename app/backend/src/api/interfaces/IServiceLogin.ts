import IUser from './IUser';

export default interface IServiceLogin {
  validate(dto: IUser): Promise<string>;
  getRole(email: string): Promise<string>;
}
