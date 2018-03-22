import * as express from "express";

// importar as rotas que serão usadas
import {IndexRouter} from "./index-route";


export class Dispatcher {

  public static dispatch(router: express.Router) {
    // conectar as rotas
    IndexRouter.connect(router);
  }

}

