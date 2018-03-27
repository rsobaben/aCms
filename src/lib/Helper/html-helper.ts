import {Util} from "../util";

/** Class to aid Html outputs */
export class HtmlHelper{
  public static readonly FILE = 0;
  public static readonly GET  = 1;
  public static readonly POST = 2;
  /**
   * Transform an object into an attributes list string
   * @param {any} attrs
   * @return {string}
   */
  private static parseAttributes(attrs: any){
    let a = '';
    Object.keys(attrs)
      .forEach((attr: any) => {
        a += `${attr}="${attrs[attr]}"`;
      });

    return a;
  }

  /**
   * Generates a form input
   * @param {string} name
   * @param {any} attributes
   * @param {string} value
   * @return {string}
   */
  public static input(name: string, attributes?: any, value:string = ''){
    let attrs;
    attributes = attributes || {};

    attributes['type'] = 'text';
    attributes['name'] = name;
    attributes['value'] = value;
    attributes['id']   = Util.slug(name);
    attrs = HtmlHelper.parseAttributes(attributes);
    return `<input ${attrs} >`;
  }

  /**
   * Generates a hidden onput field
   * @param {string} name
   * @param {any} attributes
   * @param {string} value
   * @return {string}
   */
  public static hidden(name: string, attributes?: any, value:string = '0') {
    let attrs;
    attributes = attributes || {};

    attributes['type'] = 'hidden';
    attributes['name'] = name;
    attributes['value'] = value;
    if (!attributes['id']) attributes['id'] = Util.slug(name);

    attrs = HtmlHelper.parseAttributes(attributes);
    return `<input ${attrs} >`;
  }
  /**
   * Generates a form button
   * @param {string} content
   * @param {any} attributes
   * @return {string}
   */
  public static button(content: string, attributes?: any){
    let attrs;
    attributes = attributes || {};

    attributes['type'] = 'submit';
    attrs = HtmlHelper.parseAttributes(attributes);
    return `<button ${attrs}>${content}</button>`;
  }

  /**
   * Generates a checkbox element
   * @param {string} name
   * @param {string} label
   * @param {any} attributes
   * @param {boolean} checked
   * @return {string}
   */
  public static checkbox(name: string, label: string, attributes?: any, checked:boolean = false) {
    let attrs;
    attributes = attributes || {};

    attributes['type'] = 'checkbox';
    attributes['name'] = name;
    attributes['value'] = 1;
    attributes['checked'] = checked;
    if (!attributes['id']) attributes['id'] = Util.slug(name);

    let hidden = HtmlHelper.hidden(name, {id: 'hidden' + attributes['id']});

    attrs = HtmlHelper.parseAttributes(attributes);
    return `<label>${hidden} <input ${attrs}>${label}</label>`;
  }

  /**
   * Generates a anchor tag
   * @param {string} content
   * @param {string} link
   * @param {any} attributes
   * @return {string}
   */
  public static link(content: string, link: string, attributes?: any) {
    let attrs;
    attributes = attributes || {};

    attributes['href'] = link;
    attrs = HtmlHelper.parseAttributes(attributes);
    return `<a ${attrs}>${content}</a>`
  }

  /**
   * Generate an open form tag
   * @param {number} _type
   * @param {string} action
   * @param attributes
   * @return {string}
   */
  public static form(_type: number, action: string, attributes?: any) {
    let attrs;
    attributes = attributes || {};

    attributes['action'] = action;
    switch(_type){
      case HtmlHelper.FILE:
        attributes['enctype'] = 'multipart/form-data';
      case HtmlHelper.POST:
        attributes['method'] = 'post';
        break;
      case HtmlHelper.GET:
      default:
        attributes['method'] = 'get';
        break;
    }

    attrs = HtmlHelper.parseAttributes(attributes);
    return `<form ${attrs}>`;
  }

  /**
   * generate a close form tag
   * @return {string}
   */
  public static endform(){
    return '</form>';
  }

  /**
   * Generates an input field
   * @param {string} name
   * @param {string} label
   * @param {any} inputAttr
   * @param {string} value
   * @param {any} divAttr
   * @return {string}
   */
  public static field(name: string, label:string, inputAttr?: any, value:string='', divAttr?: any){
    let input, div;
    inputAttr = inputAttr || {};
    if (!inputAttr['id']) inputAttr['id'] = Util.slug(name);
    input = HtmlHelper.parseAttributes(inputAttr);

    divAttr = divAttr || {};
    if (!divAttr['class']) divAttr['class'] = 'acms-input';
    div = HtmlHelper.parseAttributes(divAttr);

    input = HtmlHelper.input(name, inputAttr, value);
    return `
       <div${div}>
            <label for="${inputAttr['id']}">${label}</label>
            ${input}
       </div>`;
  }
}