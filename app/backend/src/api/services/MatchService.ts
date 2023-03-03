import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import Match from '../../database/models/MatchModel';
// import IdNotFoundError from '../errors/IdNotFoundError';
import IServiceMatch from '../interfaces/IServiceMatch';
// import ITeam from '../interfaces/ITeam';

export default class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  //   async create(dto: IPost): Promise<Post> {
  //     return await this.model.create({ ...dto });
  //   }
  async readAll(inProgress: string | undefined | string[]): Promise<Match[]> {
    let where = {};
    if (inProgress === 'true') where = { inProgress: true };
    if (inProgress === 'false') where = { inProgress: false };
    const result = await this.model.findAll({
      where,
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return result;
  }

  //   async readById(teamId: number): Promise<Team> {
  //     const team = await this.model.findOne({ where: { id: teamId } });
  //     if (!team) throw new IdNotFoundError('Id Not Found');
  //     return team;
  //   }

//   update(id: string, dto: IPost): Promise<Post> {
//     throw new Error("Method not implemented.");
//   }
//   delete(id: string): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
}
