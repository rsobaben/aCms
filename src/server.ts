// server.ts
import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";

//defined
import {Dispatcher} from './routes/dispatcher';

/**
 * The server class
 *
 * @class Server
 */
export class Server {
  public app: express.Application;
  private _config: any = {};

  /**
   * Returns a new instance of this class
   *
   * @class  Server
   * @method factory
   * @static
   * @return {Server}
   */
  public static factory(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // an expressjs application
    this.app = express();
    // basic config for app to work
    this.config();

    // extensions
    this.middlewares();

    // the routes
    this.routes();
  }

  /**
   * Definimos aqui
   */
  public config() {
    // ejs config
    this.app.set("views", path.join(__dirname, "../views"));
    this.app.set("view engine", "ejs");

    this.app.disable('x-powered-by');
    //mount logger
    //this.app.use(logger('dev'));

    //mount json form parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    //mount cookie parser middleware
    this.app.use(cookieParser());

    //add static paths
    this.app.use(express.static(path.join(__dirname, "../public")));


    // catch 404 and forward to error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404;
      next(err);
    });


    this.app.use( (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if(err.status == 404){
        res.status(404);

        res.render('not-found', { title: '404 - Acms' });
      }
      else next(err);
    });

    this.app.use( (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(err.status || 500);

      if (this.app.get('env') === 'development') {
        res.json({error: err.message, stack: err.stack });
      } else {
        res.render('server-error', { title: '500 - Acms' });
      }
    });

  }

  private middlewares() {
    // compression middleware
    this.app.use(compression());
  }
  private routes() {
    let router: express.Router;
    router = express.Router();

    // loadRoutes
    Dispatcher.dispatch(router);

    this.app.use(router);
  }
}