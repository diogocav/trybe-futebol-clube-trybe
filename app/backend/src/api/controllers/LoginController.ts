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
}

export default LoginController;
