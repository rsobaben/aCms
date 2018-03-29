import {Request, Response, NextFunction, Router, Application} from "express";
import {PagesController} from '../../controller/pages-controller';

export class IndexRouter {
  public static connect(router: Router, app: Application) {
    let Controller = new PagesController(app);

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      Controller.home(req, res, next);
    });

    router.get('/api',(req: Request, res: Response, next: NextFunction) => {
      Controller.api(req, res, next);
    });
  //
  }
}