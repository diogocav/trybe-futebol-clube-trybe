import { ModelStatic, Op } from 'sequelize';
import Team from '../../database/models/TeamModel';
import Match from '../../database/models/MatchModel';
// import IdNotFoundError from '../errors/IdNotFoundError';
import IServiceMatch from '../interfaces/IServiceMatch';
import IMatch from '../interfaces/IMatch';
import InvalidTeamIdError from '../errors/InvalidTeamIdError';
import NonExistentTeamId from '../errors/NonExistentTeamId';

export default class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  async create(dto: IMatch): Promise<Match> {
    if (dto.awayTeamId === dto.homeTeamId) {
      throw new InvalidTeamIdError('It is not possible to create a match with two equal teams');
    }
    const results = await Team.findAll({
      where: {
        id: {
          [Op.or]: [dto.homeTeamId, dto.awayTeamId],
        },
      },
    });
    if (results.length !== 2) {
      throw new NonExistentTeamId('There is no team with such id!');
    }
    return this.model.create({ ...dto, inProgress: true });
  }

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

  async updateProgress(id: number): Promise<void> {
    const [affectedCount] = await this.model.update(
      { inProgress: false },
      { where: {
        id,
      } },
    );
    if (affectedCount !== 1) throw new Error(`invalid id ${affectedCount}`);
  }

  async updateScore(id: number, dto: IMatch): Promise<void> {
    const { awayTeamGoals, homeTeamGoals } = dto;
    const [affectedCount] = await this.model.update(
      { awayTeamGoals, homeTeamGoals },
      { where: {
        id,
      } },
    );
    if (affectedCount !== 1) throw new Error(`invalid id ${affectedCount}`);
  }

//   delete(id: string): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
}
