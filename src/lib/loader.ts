import * as path from "path";
import {Util} from './util';

export class Loader {

  public static model(modelName: string, prefix?: string){
    let _path = 'src/' + (prefix ? `${prefix}/` : '') + `controller/${modelName}`;

    return require(_path);
  }

  public static controller(controllerName: string, prefix?: string) {
    let _path = 'src/' + (prefix ? `${prefix}/` : '') + `controller/${controllerName}`;

    return require(_path);
  }

  public static lib(libName: string, prefix?: string) {
    let _path = 'src/' + (prefix ? `${prefix}/` : '') + `controller/${libName}`;

    return require(_path);
  }

  public static loadDir(dir: string, type: string, ext?: string) {
    let object:any = {};
    let globalFiles = Util.fileList(dir, ext);

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
