import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import ValidateFields from '../middlewares/validateFields';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);
// postRoutes.post('/teams', (req: Request, res:Response) => postController.create(req, res));
matchRoutes.get('/matches', (req: Request, res:Response) => matchController.readAll(req, res));
// teamRoutes.get('/teams/:id', (req: Request, res:Response) => teamController.readById(req, res));
matchRoutes.patch(
  '/matches/:id/finish',
  ValidateFields.token,
  (req: Request, res:Response) => matchController.updateProgress(req, res),
);

export default matchRoutes;
