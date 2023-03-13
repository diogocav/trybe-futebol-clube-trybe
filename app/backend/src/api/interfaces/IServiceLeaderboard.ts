// import Team from '../../database/models/TeamModel';
// import Match from '../../database/models/MatchModel';
// import IMatch from './IMatch';

import ITeamClassification from './ITeamClassification';

export default interface IServiceLeaderboard {
  readAll(): Promise<ITeamClassification[]>;
  readHome(): Promise<ITeamClassification[]>;

}
