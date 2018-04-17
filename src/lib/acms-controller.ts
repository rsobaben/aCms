///<reference path="./util.ts"/>
// import
import { NextFunction, Request, Response, Application } from "express";
import {Util} from './util';
import * as _ from 'lodash';
import {BlocksHelper} from "./Helper/blocks-helper";

/** Base class for controller */
export class AcmsController{
  /**
   * Stores data to be used on view
   */
  protected viewVars: any;
  /**
   * Stores the appplication reference
   */
  protected app: Application;
  /**
   * Constructor
   * @constructor
   */
  constructor(app: Application) {
    /*
    if (!app) throw MissingAppException('Controller');
    */
    this.app = app;
    // sets default values for title and description and a body-class
    this.viewVars = {title_for_view:'', description_for_view:'', body_class: 'acms-body'};
    this.loadHelper('View', BlocksHelper);
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
   * @param {e.Response} res
   * @param {string} view
   * @param {Object} options
   */
  public render(res: Response, view: string, options?: Object) {
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
   * @param {e.Response} res
   * @param {string} path
   */
  public redirect( res: Response, path: string) {
    res.redirect(path);
  }

  /**
   * renders data as json output
   * @param {e.Request} req
   * @param {e.Response} res
   * @param data
   */
  public json(res: Response, data: any) {
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
    this.app.locals[label] = obj;
  }

  public isPost(req: Request) {
    return !!_.size(req.body);
  }
}

/*
conter as respostas para as requisicoes

/prefix?/controller/action maybe?!

*/