import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import ValidateFields from '../middlewares/validateFields';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);
matchRoutes.get('/matches', (req: Request, res:Response) => matchController.readAll(req, res));
matchRoutes.post(
  '/matches',
  ValidateFields.token,
  (req: Request, res:Response) => matchController.create(req, res),
);
matchRoutes.patch(
  '/matches/:id/finish',
  ValidateFields.token,
  (req: Request, res:Response) => matchController.updateProgress(req, res),
);
matchRoutes.patch(
  '/matches/:id',
  ValidateFields.token,
  (req: Request, res:Response) => matchController.updateScore(req, res),
);

export default matchRoutes;
