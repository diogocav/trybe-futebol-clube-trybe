import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  //   async create(req: Request, res: Response) {
  //     const { title, content } = req.body;
  //     const result = await this._service.create({ title, content })
  //     return res.status(201).json(result);
  //   }

  async readById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.readById(parseInt(id, 10));
    return res.status(200).json(result);
  }

  async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }
}

export default TeamController;
