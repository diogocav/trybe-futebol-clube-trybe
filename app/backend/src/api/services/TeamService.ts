import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import IdNotFoundError from '../errors/IdNotFoundError';
// import ITeam from '../interfaces/ITeam';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  //   async create(dto: IPost): Promise<Post> {
  //     return await this.model.create({ ...dto });
  //   }
  async readAll(): Promise<Team[]> {
    const result = await this.model.findAll();
    return result;
  }

  async readById(teamId: number): Promise<Team> {
    const team = await this.model.findOne({ where: { id: teamId } });
    if (!team) throw new IdNotFoundError('Id Not Found');
    return team;
  }

//   update(id: string, dto: IPost): Promise<Post> {
//     throw new Error("Method not implemented.");
//   }
//   delete(id: string): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
}
