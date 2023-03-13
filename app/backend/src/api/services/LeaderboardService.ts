import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import Match from '../../database/models/MatchModel';
// import IdNotFoundError from '../errors/IdNotFoundError';
// import IServiceMatch from '../interfaces/IServiceMatch';
// import IMatch from '../interfaces/IMatch';
// import InvalidTeamIdError from '../errors/InvalidTeamIdError';
// import NonExistentTeamId from '../errors/NonExistentTeamId';

import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import ITeamClassification from '../interfaces/ITeamClassification';
import ITeam from '../interfaces/ITeam';
import IMatch from '../interfaces/IMatch';

export default class LeaderboardService implements IServiceLeaderboard {
  protected matchModel: ModelStatic<Match> = Match;
  protected teamModel: ModelStatic<Team> = Team;

  //   async create(dto: IMatch): Promise<Match> {
  //     if (dto.awayTeamId === dto.homeTeamId) {
  //       throw new InvalidTeamIdError('It is not possible to create a match with two equal teams');
  //     }
  //     const results = await Team.findAll({
  //       where: {
  //         id: {
  //           [Op.or]: [dto.homeTeamId, dto.awayTeamId],
  //         },
  //       },
  //     });
  //     if (results.length !== 2) {
  //       throw new NonExistentTeamId('There is no team with such id!');
  //     }
  //     return this.model.create({ ...dto, inProgress: true });
  //   }

  //   async readById(teamId: number): Promise<Team> {
  //     const team = await this.model.findOne({ where: { id: teamId } });
  //     if (!team) throw new IdNotFoundError('Id Not Found');
  //     return team;
  //   }

  //   async updateProgress(id: number): Promise<void> {
  //     const [affectedCount] = await this.model.update(
  //       { inProgress: false },
  //       { where: {
  //         id,
  //       } },
  //     );
  //     if (affectedCount !== 1) throw new Error(`invalid id ${affectedCount}`);
  //   }

  //   async updateScore(id: number, dto: IMatch): Promise<void> {
  //     const { awayTeamGoals, homeTeamGoals } = dto;
  //     const [affectedCount] = await this.model.update(
  //       { awayTeamGoals, homeTeamGoals },
  //       { where: {
  //         id,
  //       } },
  //     );
  //     if (affectedCount !== 1) throw new Error(`invalid id ${affectedCount}`);
  //   }

  //   delete(id: string): Promise<void> {
  //     throw new Error("Method not implemented.");
  //   }

  private static getStats(team: ITeam, matches: IMatch[]) {
    const stats = matches.reduce((acc, curr) => {
      if (curr.homeTeamId === team.id) {
        if (curr.homeTeamGoals > curr.awayTeamGoals) acc.totalVictories += 1;
        if (curr.homeTeamGoals < curr.awayTeamGoals) acc.totalLosses += 1;
        acc.goalsFavor += curr.homeTeamGoals;
        acc.goalsOwn += curr.awayTeamGoals;
        acc.totalGames += 1;
      }
      if (curr.awayTeamId === team.id) {
        if (curr.homeTeamGoals < curr.awayTeamGoals) acc.totalVictories += 1;
        if (curr.homeTeamGoals > curr.awayTeamGoals) acc.totalLosses += 1;
        acc.goalsOwn += curr.homeTeamGoals;
        acc.goalsFavor += curr.awayTeamGoals;
        acc.totalGames += 1;
      }
      return acc;
    }, { totalGames: 0, totalVictories: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 });
    return stats;
  }

  private static calculateStats(team: ITeam, matches: IMatch[]) {
    const stats = LeaderboardService.getStats(team, matches);
    const totalDraws = stats.totalGames - (stats.totalVictories + stats.totalLosses);
    const totalPoints = (stats.totalVictories * 3) + totalDraws;
    const goalsBalance = stats.goalsFavor - stats.goalsOwn;
    const efficiency = (totalPoints / (stats.totalGames * 3)) * 100;
    return { ...stats,
      totalDraws,
      totalPoints,
      goalsBalance,
      efficiency: parseFloat(efficiency.toFixed(2)) };
  }

  // matches.reduce((acc, curr) => {
  //     if (curr.homeTeamId === team.id) {
  //         if (curr.homeTeamGoals > curr.awayTeamGoals) acc.totalVictories+= 1;
  //         if (curr.homeTeamGoals < curr.awayTeamGoals) acc.totalLosses+= 1;
  //         acc.goalsfavor += curr.homeTeamGoals;
  //         acc.goalsOwn += curr.awayTeamGoals;
  //         totalGames += 1;
  //     }
  //     if (curr.awayTeamId === team.id) {
  //         if (curr.homeTeamGoals < curr.awayTeamGoals) acc.totalVictories+= 1;
  //         if (curr.homeTeamGoals > curr.awayTeamGoals) acc.totalLosses+= 1;
  //         acc.goalsOwn += curr.homeTeamGoals;
  //         acc.goalsfavor += curr.awayTeamGoals;
  //         totalGames += 1;
  //     }
  //     return acc;
  // }, { totalGames: 0, totalVictories: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 });

  //   private static calculateTotalPoint(team: ITeam, matches: IMatch[]) {
  //     const awayMatches = matches.filter((match) => match.awayTeamId === team.id);
  //     const awayGoalsOwn
  //     const awayGoalsFavor
  //     const awayVictories
  //     const awayLosses
  //     const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
  //    }

  private static mountLeaderboard(teams: ITeam[], matches: IMatch[]) {
    const leaderboard = teams.map((team) => {
      const stats = LeaderboardService.calculateStats(team, matches);
      return {
        name: team.teamName,
        totalPoints: stats.totalPoints,
        totalGames: stats.totalGames,
        totalVictories: stats.totalVictories,
        totalDraws: stats.totalDraws,
        totalLosses: stats.totalLosses,
        goalsFavor: stats.goalsFavor,
        goalsOwn: stats.goalsOwn,
        goalsBalance: stats.goalsBalance,
        efficiency: stats.efficiency,
      };
    });
    return leaderboard;
  }

  async readAll(): Promise<ITeamClassification[]> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const leaderboard = LeaderboardService.mountLeaderboard(teams, matches);
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
        || a.totalVictories - b.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsOwn - a.goalsOwn);
    return leaderboard;
  }
}

// [
//     {
//       "name": "Palmeiras",
//       "totalPoints": 13,
//       "totalGames": 5,
//       "totalVictories": 4,
//       "totalDraws": 1,
//       "totalLosses": 0,
//       "goalsFavor": 17,
//       "goalsOwn": 5,
//       "goalsBalance": 12,
//       "efficiency": 86.67
//     },
// ]

// teams:
// [
//     {
//       "id": 1,
//       "teamName": "Avaí/Kindermann"
//     },
//     {
//       "id": 2,
//       "teamName": "Bahia"
//     },
//     {
//       "id": 3,
//       "teamName": "Botafogo"
//     },
//     ...
//   ]

// matches:

// [
//     {
//       "id": 1,
//       "homeTeamId": 16,
//       "homeTeamGoals": 1,
//       "awayTeamId": 8,
//       "awayTeamGoals": 1,
//       "inProgress": false,
//       "homeTeam": {
//         "teamName": "São Paulo"
//       },
//       "awayTeam": {
//         "teamName": "Grêmio"
//       }
//     },
//   ]

//   Para calcular o Total de Pontos, você deve levar em consideração que:

// O time vitorioso: marcará +3 pontos;
// O time perdedor: marcará 0 pontos;
// Em caso de empate: ambos os times marcam +1 ponto.

// Para o campo Aproveitamento do time (%), que é a porcentagem de jogos ganhos, use a seguinte fórmula: [P / (J * 3)] * 100, onde:

// P: Total de Pontos;
// J: Total de Jogos.
// Obs.: O seu resultado deverá ser limitado a duas casas decimais

// Para calcular Saldo de Gols use a seguinte fórmula: GP - GC, onde:

// GP: Gols marcados a favor;
// GC: Gols sofridos.

// O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no Total de Pontos, você deve levar em consideração os seguintes critérios para desempate:
// Ordem para desempate
// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.

// A sua tabela deverá renderizar somente as PARTIDAS que já foram FINALIZADAS! Os seguintes pontos serão avaliados:
// - Se a lista de classificação está correta;
// - Se a regra de classificação se mantém mesmo com mudanças na classificação;
// - Se a tabela de classificação tem 10 colunas;
// - Se a tabela tem uma linha para cada time.
