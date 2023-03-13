import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

class LeaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async readAll(_req: Request, res: Response) {
    // const inProgress = _req.query.inProgress as string | undefined;
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }

  async readHome(_req: Request, res: Response) {
    // const inProgress = _req.query.inProgress as string | undefined;
    const result = await this._service.readHome();
    return res.status(200).json(result);
  }
}

export default LeaderboardController;
