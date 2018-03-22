import {Request, Response, NextFunction, Router} from "express";
import {PagesController} from '../controller/pages-controller';

export class IndexRouter {
  public static connect(router: Router) {
    let Controller = new PagesController();

    router.get('/',(req: Request, res: Response, next: NextFunction) => {
      Controller.home(req, res, next);
    });
  //
  }
}