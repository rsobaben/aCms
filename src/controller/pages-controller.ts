import { NextFunction, Request, Response} from "express";
import { AcmsController } from '../lib/acms-controller';

export class PagesController extends AcmsController {
  constructor(){ super();}

  public home(req: Request, res: Response, next: NextFunction) {
    this.set('title', 'Pagina legal');

    this.render(req, res, 'pages/home');
  }
}