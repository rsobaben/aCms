///<reference path="./util.ts"/>
// import
import { NextFunction, Request, Response } from "express";
import {Util} from './util';

/**
 * AcmsController base class
 * @class AcmsController
 *
 */
export class AcmsController{
  /**
   * Stores data to be used on view
   */
  protected viewVars: any;

  /**
   * Constructor
   *
   * @class AcmsController
   * @constructor
   */
  constructor(){
    this.viewVars = {};
  }

  /**
   * Stores values to be sent to view
   *
   * @class  AcmsController
   * @method set
   * @param a
   * @param b
   */
  public set(a: any, b?:any) {
    if (typeof b === 'undefined') {
      Util.merge(this.viewVars, a);
      return;
    }
    this.viewVars[a] = b;
  }

  /**
   * Renders a view
   *
   * @class  AcmsController
   * @method render
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {string} view
   * @param {Object} options
   */
  public render(req: Request, res: Response, view: string, options?: Object) {
    if (typeof options === 'undefined') {
      options = {};
    }

    // set stored value for views
    Util.merge(options, this.viewVars);

    res.render(view, options);
  }

  /**
   * Redirects to a path
   *
   * @class  AcmsController
   * @method redirect
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {string} path
   */
  public redirect(req: Request, res: Response, path: string) {
    res.redirect(path);
  }

  public json(req: Request, res: Response, data: any) {
    let _data;

    if (data['toJson']) {
      _data = data.toJSON();
    } else {
      _data = JSON.stringify(data);
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(_data);
  }
}

/*
conter as respostas para as requisicoes

/prefix?/controller/action maybe?!

*/