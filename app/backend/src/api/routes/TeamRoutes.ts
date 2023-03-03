import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);
// postRoutes.post('/teams', (req: Request, res:Response) => postController.create(req, res));
teamRoutes.get('/teams', (req: Request, res:Response) => teamController.readAll(req, res));
teamRoutes.get('/teams/:id', (req: Request, res:Response) => teamController.readById(req, res));

export default teamRoutes;
