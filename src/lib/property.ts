
export class Property {
  public static data: any;

  public static init() {
    Property.data = {};
  }

  public static find(path: string, data: any): any {
    let parts = path.split('.'), part = parts.shift();

    if (!data[part]) {
      return null;
    }

    if (parts.length) {
      return Property.find(parts.join('.'), data[part]);
    }

    return data[path];
  }

  public static read(path: string) {
    return Property.find(path, Property.data);
  }
}