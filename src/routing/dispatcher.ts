import * as express from "express";

// importar as rotas que serão usadas
import {IndexRouter} from "./routes/index-route";


export class Dispatcher {
  public _app:express.Application;

  constructor(app: express.Application) {
    /*
    if (!app) throw MissingAppException('Dispatcher');
     */
    this._app = app;
  }

  public dispatch(router: express.Router) {
    // conectar as rotas
    IndexRouter.connect(router, this._app);

  }
}

