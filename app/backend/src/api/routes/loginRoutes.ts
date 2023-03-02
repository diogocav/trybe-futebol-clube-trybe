import { Router, Request, Response } from 'express';
import LoginController from '../controllers/LoginController';
import ValidateFields from '../middlewares/validateFields';
import LoginService from '../services/LoginService';

const loginRoutes = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);
loginRoutes.post(
  '/login',
  ValidateFields.login,
  (req: Request, res:Response) => loginController.validate(req, res),
);
loginRoutes.get(
  '/login/role',
  ValidateFields.token,
  (req: Request, res:Response) => loginController.getRole(req, res),
);

export default loginRoutes;
