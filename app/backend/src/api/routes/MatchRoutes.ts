import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);
// postRoutes.post('/teams', (req: Request, res:Response) => postController.create(req, res));
matchRoutes.get('/matches', (req: Request, res:Response) => matchController.readAll(req, res));
// teamRoutes.get('/teams/:id', (req: Request, res:Response) => teamController.readById(req, res));

export default matchRoutes;
