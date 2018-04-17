// imports
import {Entity} from "./entity";

/** Classe para os modelos acms */
export class AcmsModel {
  /** Tabela que o modulo referencia */
  public table: string;

  /**
   * Construtor
   * @param {string} table_name
   */
  constructor(table_name: string) {
    this.table = table_name;
  }

  /**
   * Cria uma nova entidade
   * Sobrescrever em cada modulo
   * @return {Entity}
   */
  newEntity(){
    return new Entity();
  }

  /**
   * Atribui a `entity` valores presentes em data
   * @param entity
   * @param data
   * @todo considerar json-schema para buscar os dados em data
   */
  patchEntity(entity: any, data: any) {
    Object.keys(entity)
      .forEach( (attr: any) => {
        if (typeof data[attr] != 'undefined') {
          entity[attr] = data[attr];
        }
      })
  }

  /**
   * Cria uma nova entidade com os dados em raw_data
   * @param raw_data
   * @return {Entity}
   */
  buildEntity(raw_data: any) {
    let entity = this.newEntity();
    this.patchEntity(entity, raw_data);
    return entity;
  }
}
