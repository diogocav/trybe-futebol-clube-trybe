import { Router, Request, Response } from 'express';
// import MatchController from '../controllers/MatchController';
// import MatchService from '../services/MatchService';
// import ValidateFields from '../middlewares/validateFields';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoutes = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);
leaderboardRoutes.get(
  '/leaderboard',
  (req: Request, res:Response) => leaderboardController.readAll(req, res),
);
// matchRoutes.post(
//   '/matches',
//   ValidateFields.token,
//   (req: Request, res:Response) => matchController.create(req, res),
// );
// matchRoutes.patch(
//   '/matches/:id/finish',
//   ValidateFields.token,
//   (req: Request, res:Response) => matchController.updateProgress(req, res),
// );
// matchRoutes.patch(
//   '/matches/:id',
//   ValidateFields.token,
//   (req: Request, res:Response) => matchController.updateScore(req, res),
// );

export default leaderboardRoutes;
