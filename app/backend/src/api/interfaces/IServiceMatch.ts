// import Team from '../../database/models/TeamModel';
import Match from '../../database/models/MatchModel';
import IMatch from './IMatch';

export default interface IServiceMatch {
  create(dto: IMatch): Promise<Match>;
  readAll(inProgress: string | undefined | string[]): Promise<Match[]>;
  //   readById(id: number): Promise<Match>;
  updateProgress(id: number): Promise<void>;
  updateScore(id: number, dto: IMatch): Promise<void>;
//   delete(id: string): Promise<void>;
}
