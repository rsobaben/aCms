/** Class to aid Html blocks outputs */
export class BlocksHelper {
  public static _css: string[] = [];
  public static _js: string[] = [];
  public static _blocks: any = {};

  /**
   * Reset all variables
   */
  public static reset() {
    BlocksHelper._css = [];
    BlocksHelper._js = [];
    BlocksHelper._blocks = {};
  }

  /**
   * Queue a stylysheet file
   * @param {string} path
   */
  public static loadCss(path: string) {
    let file = `<link rel="stylesheet" href="${path}">`;
    BlocksHelper._css.push(file);
  }

  /**
   * add a css block
   * @param {string} style
   */
  public static addCss(style: string) {
    BlocksHelper._css.push(style);
  }

  /**
   * Queue a script file
   * @param {string} path
   */
  public static loadJs(path: string) {
    let file = `<script src="${path}"></script>`;
    BlocksHelper._js.push(file);
  }

  /**
   * add a script block
   * @param {string} script
   */
  public static addJs(script: string) {
    BlocksHelper._js.push(script);
  }

  /**
   * Sets/Appends 'code' to a 'block'
   * @param {string} block
   * @param {string} code
   */
  public static block(block: string, code: string) {
    if (typeof BlocksHelper._blocks[block] == "undefined") {
      BlocksHelper._blocks[block] = "";
    }
    BlocksHelper._blocks[block] += code;
  }

  /**
   * Assigns 'code' to 'block', overwrites if existed;
   * @param {string} block
   * @param {string} code
   */
  public static assign(block: string, code: string) {
    BlocksHelper._blocks[block] = code;
  }


  /**
   * fetches all js codes
   * @return {string}
   */
  public static fetchJs() {
    let ret = '', a;
    while((a = BlocksHelper._js.shift())) {
      ret += a;
    }
    return ret;
  }

  /**
   * fetches all css codes
   * @return {string}
   */
  public static fetchCss() {
    let ret = '', a;
    while((a = BlocksHelper._css.shift())) {
      ret += a;
    }
    return ret;
  }

  /**
   * fetches 'block', if exists
   * @param {string} block
   * @return {string}
   */
  public static fetch(block: string) {
    if (typeof BlocksHelper._blocks[block] != "undefined") {
      return BlocksHelper._blocks[block];
    }
    return "";
  }

}