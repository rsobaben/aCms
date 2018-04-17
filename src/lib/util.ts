import * as path from "path";
import * as glob from "glob";

/** Class for utility methods */
export class Util {
  /**
   * List all the files in a given directory
   * @static
   * @return string[]
   */
  public static fileList(directory: string, extension?: string): string[]  {
    return glob.sync(path.resolve('./', directory + (extension ? '/*.' + extension : '/*.js')));
  }

  /**
   * Extends Promise to enable spread method!
   * @static
   * @return void
   * /
  public static promiseSpread() : void {
    if (!Promise.prototype.spread) {
      Promise.prototype.spread = function (fn) {
        return this.then(function (args) {
          return Promise.all(args);
        }).then(function(args){
          return fn.apply(this, args);
        });
      };
    }
  } // */

  /**
   * Validates a Br-cpf
   * @static
   * @return boolean
   */
  public static validateCpf(cpf: string): boolean {
    cpf = cpf.replace(/[.\-\/]/g, '');
    if (!cpf.match(/^\d+$/g)) return false;

    if (cpf === '00000000000' || cpf === '11111111111' ||
      cpf === '22222222222' || cpf === '33333333333' ||
      cpf === '44444444444' || cpf === '55555555555' ||
      cpf === '66666666666' || cpf === '77777777777' ||
      cpf === '88888888888' || cpf === '99999999999' ||
      (cpf.length !== 11)) {
      return false;
    }

    let dig10, dig11;
    let sm, i, r, num, weight;

    sm = 0;
    weight = 10;
    for (i = 0; i < 9; i++) {
      num = (cpf.charCodeAt(i) - 48);
      sm = sm + (num * weight);
      weight = weight - 1;
    }

    r = 11 - (sm % 11);
    if ((r === 10) || (r === 11))
      dig10 = '0';
    else dig10 = String.fromCharCode(r + 48);

    sm = 0;
    weight = 11;

    for (i = 0; i < 10; i++) {
      num = (cpf.charCodeAt(i) - 48);
      sm = sm + (num * weight);
      weight = weight - 1;
    }

    r = 11 - (sm % 11);
    if ((r === 10) || (r === 11)) dig11 = '0';
    else dig11 = String.fromCharCode(r + 48);

    return (dig10 === cpf.charAt(9)) && (dig11 === cpf.charAt(10));
  }

  /**
   * Validates a Br-cnpj
   * @static
   * @param {string} cnpj
   * @return {boolean}
   */
  public static validateCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/[.\-\/]/g, '');
    if (!cnpj.match(/^\d+$/g)) return false;

    if (cnpj === '00000000000000' || cnpj === '11111111111111' ||
      cnpj === '22222222222222' || cnpj === '33333333333333' ||
      cnpj === '44444444444444' || cnpj === '55555555555555' ||
      cnpj === '66666666666666' || cnpj === '77777777777777' ||
      cnpj === '88888888888888' || cnpj === '99999999999999' ||
      (cnpj.length !== 14)) {

      return false;
    }

    let dig13, dig14;
    let sm, i, r, num, weight;

    sm = 0;
    weight = 2;
    for (i = 11; i >= 0; i--) {

      num = (cnpj.charCodeAt(i) - 48); //int
      sm = sm + (num * weight);
      weight = weight + 1;
      if (weight === 10) weight = 2;
    }

    r = sm % 11;
    if ((r === 0) || (r === 1)) dig13 = '0';
    else dig13 = String.fromCharCode(((11 - r) + 48));

    sm = 0;
    weight = 2;
    for (i = 12; i >= 0; i--) {
      num = (cnpj.charCodeAt(i) - 48);
      sm = sm + (num * weight);
      weight = weight + 1;
      if (weight === 10)
        weight = 2;
    }

    r = sm % 11;
    if ((r === 0) || (r === 1))
      dig14 = '0';
    else dig14 = String.fromCharCode((11 - r) + 48);

    return (dig13 === cnpj.charAt(12)) && (dig14 === cnpj.charAt(13));
  }

  /**
   * Formats value for mone
   * @static
   * @param {number} value
   * @param {number} places
   * @param {string} symbol
   * @param {string} thousand
   * @param {string} decimal
   * @return {string}
   */
  public static formatMoney(value: number, places: number, symbol: string, thousand: string, decimal: string): string {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "";
    thousand = thousand || ".";
    decimal = decimal || ",";
    let number:any = value,
      negative = number < 0 ? "-" : "",
      i:any = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
      j = i.length;

    j = j > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
      (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
  }

  /**
   * Format a br-date-like-string input as iso [y-m-dTH:i:s:00Z]
   * @static
   * @param {string} sDate
   * @return {string}
   */
  public static formatDateIso(sDate: string): string {
    let date = sDate.split(/ /g)[0];
    let time = sDate.split(/ /g)[1];

    return date.split(/\//g)[2] + '-' + date.split(/\//g)[1] + '-' + date.split(/\//g)[0] + 'T' + time + ':00Z';
  }

  /**
   * Format a br-date-like-string input as [y-m-d H:i:s]
   * @static
   * @param {string} sDate
   * @return {string}
   */
  public static formatDate(sDate: string): string {
    let date = sDate.split(/ /g)[0];
    let time = sDate.split(/ /g)[1];

    return date.split(/\//g)[2] + '-' + date.split(/\//g)[1] + '-' + date.split(/\//g)[0] + ' ' + time;
  }

  /**
   * validates
   * @param {string} number
   * @return {boolean}
   */
  public static validateNumberDecimalSigned(number: string): boolean {
    return /^[\d]{1,15}$/g.test(number);
  }

  /**
   * merges b object into a
   * @param {Object} a
   * @param {Object} b
   */
  public static merge(a: any, b: any) {
    if (typeof b === 'object')
    Object.keys(b)
      .forEach((_key: any) => {
        a[_key] = b[_key];
      });
  }

  /**
   * Short attempt to slugify
   * @param {string} str
   * @return {string}
   */
  public static slug(str: string) {
      str = str
        .replace(/^\s+|\s+$/g, '') // trim
        .toLowerCase();

      // remove accents, swap ñ for n, etc
      let from = "àáäâèéëêìíïîòóöôùúüûñç·/-,:;",
          to   = "aaaaeeeeiiiioooouuuunc______";
      for (let i=0, l=from.length ; i<l ; ++i) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      // remove regp chars for _
      let yay = '{}[]()';
      for (let i=0, l = yay.length; i<l; ++i){
        str = str.replace(new RegExp('\\'+yay.charAt(i), 'g'), '_');
      }

      return str
        .replace(/[^a-z0-9 _]/g, '') // remove invalid chars
        .replace(/\s+/g, '_') // collapse whitespace and replace by _
        .replace(/_+/g, '_'); // collapse underscore
  }

  public static env() {
    return process.env.NODE_ENV || 'development';
  }
}