import * as express from 'express';
import 'express-async-errors';
import teamRoutes from './api/routes/TeamRoutes';
import ErrorHandler from './api/middlewares/ErrorHandler';
import loginRoutes from './api/routes/LoginRoutes';
import matchRoutes from './api/routes/MatchRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.initRoutes();
    this.initMiddlewares();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private initRoutes(): void {
    this.app.use(teamRoutes);
    this.app.use(loginRoutes);
    this.app.use(matchRoutes);
  }

  private initMiddlewares() {
    this.app.use(ErrorHandler.handle);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
