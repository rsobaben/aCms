import * as path from "path";
import * as util from './util';

export class Loader {

  public model(modelName: string){

  }
  public controller(controllerName: string) {

  }
  public router(routerName: string) {

  }
  public lib(libName: string) {

  }

  public static loadDir(dir: string, type: string, ext: string) {
    let object:any = {};
    let globalFiles = util.Util.fileList(dir, ext);

    for(let file in globalFiles){
      let url = path.resolve(__dirname, globalFiles[file]);

      if(type === 'global') return require(url);
      else if(type === 'object') {
        let name = /\/([\w-]+)\.[\w]+(\.|[\w]$)/g.exec(url)[1];
        name = name.toLowerCase()
          .replace(/-[a-z]/g,  (c) => { return c.toUpperCase(); })
          .replace(/-/g, '');

        object[name] = require(url);
      }
    }

    return object;
  }
}