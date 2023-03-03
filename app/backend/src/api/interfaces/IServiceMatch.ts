// import Team from '../../database/models/TeamModel';
import Match from '../../database/models/MatchModel';
// import ITeam from "./ITeam";

export default interface IServiceMatch {
//   create(dto: IPost): Promise<Team>;
  readAll(inProgress: string | undefined | string[]): Promise<Match[]>;
//   readById(id: number): Promise<Match>;
//   update(id: string, dto: ITeam): Promise<Team>;
//   delete(id: string): Promise<void>;
}
