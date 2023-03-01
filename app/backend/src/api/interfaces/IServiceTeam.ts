import Team from '../../database/models/TeamModel';
// import ITeam from "./ITeam";

export default interface IServiceTeam {
//   create(dto: IPost): Promise<Team>;
  readAll(): Promise<Team[]>;
  readById(id: number): Promise<Team>;
//   update(id: string, dto: ITeam): Promise<Team>;
//   delete(id: string): Promise<void>;
}
