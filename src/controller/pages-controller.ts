import { NextFunction, Request, Response, Application} from "express";
import { AcmsController } from '../lib/acms-controller';

export class PagesController extends AcmsController {
  constructor(app: Application){ super(app); }

  public home(req: Request, res:  Response, next: NextFunction) {
    this.title('Minha Página Legal');

    this.render(req, res, 'pages/home');
  }

  public api(req: Request, res: Response, next: NextFunction) {
    this.json(req, res, {response:1, data:[], status:'success'});
  }
}