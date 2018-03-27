import { NextFunction, Request, Response} from "express";
import { AcmsController } from '../lib/acms-controller';

export class PagesController extends AcmsController {
  constructor(){ super();}

  public home(req: Request, res: Response, next: NextFunction) {
    this.title('Minha Página Legal');

    this.render(req, res, 'pages/home');
  }

  public api(req: Request, res: Response, next: NextFunction) {
    this.json(req, res, {response:1, data:[], status:'success'});
  }
}