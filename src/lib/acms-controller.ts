///<reference path="./util.ts"/>
// import
import { NextFunction, Request, Response } from "express";
import {Util} from './util';

/** Base class for controller */
export class AcmsController{
  /**
   * Stores data to be used on view
   */
  protected viewVars: any;

  /**
   * Constructor
   * @constructor
   */
  constructor() {
    // sets default values for title and description and a body-class
    this.viewVars = {title_for_view:'', description_for_view:'', body_class: 'acms-body'};
  }

  /**
   * Stores values to be sent to view
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
   * sets title for a view
   * @param {string} title
   */
  public title(title: string){
    this.set('title_for_view', title);
  }

  /**
   * site description for a view
   * @param {string} description
   */
  public description(description: string) {
    this.set('description_for_view', description);
  }

  /**
   * Renders a view
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

  /**
   * renders data as json output
   * @param {e.Request} req
   * @param {e.Response} res
   * @param data
   */
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

  /**
   * Loads a helper into a view
   * @param {string} label
   * @param obj
   */
  public loadHelper(label: string, obj: any) {
    this.viewVars[label] = obj;
  }
}

/*
conter as respostas para as requisicoes

/prefix?/controller/action maybe?!

*/