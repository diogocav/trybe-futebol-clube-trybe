import { Request, Response } from 'express';
import IServiceLogin from '../interfaces/IServiceLogin';

class LoginController {
  private _service: IServiceLogin;

  constructor(service: IServiceLogin) {
    this._service = service;
  }

  async validate(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this._service.validate({ email, password });
    return res.status(200).json({ token });
  }

  async getRole(req: Request, res: Response) {
    const { email } = req.body;
    const role = await this._service.getRole(email);
    return res.status(200).json({ role });
  }
}

export default LoginController;
