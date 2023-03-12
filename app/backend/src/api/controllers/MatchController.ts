import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async create(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this._service
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });
    return res.status(201).json(result);
  }

  //   async readById(req: Request, res: Response) {
  //     const { id } = req.params;
  //     const result = await this._service.readById(parseInt(id, 10));
  //     return res.status(200).json(result);
  //   }

  async readAll(_req: Request, res: Response) {
    const inProgress = _req.query.inProgress as string | undefined;
    const result = await this._service.readAll(inProgress);
    return res.status(200).json(result);
  }

  async updateProgress(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.updateProgress(parseInt(id, 10));
    return res.status(200).json({ message: 'Finished' });
  }

  async updateScore(req: Request, res: Response) {
    const { id } = req.params;
    const dto = req.body;
    await this._service.updateScore(parseInt(id, 10), dto);
    return res.status(200).json({ message: 'Updated' });
  }
}

export default MatchController;
