// server.ts
import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";

//defined
import {Dispatcher} from './routing/dispatcher';

/**
 * The server class
 *
 * @class Server
 */
export class Server {
  public app: express.Application;

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

    // the routing
    this.routes();

    this.errorHandler();
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
  }

  private errorHandler() {
    // catch 404 and forward to error handler
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    this.app.use( (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err.status == 404) {
        res.status(404);

        res.render('error/not-found', { title: '404 - Acms' });
      }
      else next(err);
    });

    this.app.use( (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(err.status || 500);

      if (this.app.get('env') === 'development') {
        res.json({error: err.message, stack: err.stack });
      } else {
        res.render('error/server-error', { title: '500 - Acms' });
      }
    });

  }

  private setLocals(label: string, obj: any) {
    this.app.locals[label] = obj;
  }

  private middlewares() {
    // compression middleware
    this.app.use(compression());
  }

  private routes() {
    let _Router: express.Router, _Dispatcher: Dispatcher;

    _Router = express.Router();
    _Dispatcher = new Dispatcher(this.app);

    // loadRoutes
    _Dispatcher.dispatch(_Router);

    this.app.use(_Router);
  }
}