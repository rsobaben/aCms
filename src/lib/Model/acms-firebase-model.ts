// imports
import {AcmsModel} from "./acms-model";
import * as _ from  'lodash';
import * as firebase from "firebase";
import {Entity} from "./entity";
import {Util} from "../util";
import {Property} from "../property";
import {Configure} from "../../config/configure";


/** Classe que manipula entidades para Firebase */
export class AcmsFirebaseModel extends AcmsModel{
  /**
   * Construtor
   * @param {string} table_name
   */
  constructor(table_name: string) {
    super(table_name);
    this.initApp();
  }

  /**
   * inicializa um app no firebase
   */
  protected initApp() {
    if (firebase.apps.length === 0) {
      let env = Util.env();
      let _conf = Property.find(`${env}.firebase`, Configure.data);
      if (_conf){
        console.log(`Firebase iniciado em ${env}`);
        firebase.initializeApp(_conf);
      }
    }
  }

  /**
   * referencia ao nó que representa o modelo base
   * @return {firebase.database.Reference}
   */
  protected getRef() {
    return firebase.database().ref(this.table);
  }

  /**
   * source do modelo
   * @return {firebase.database.Database}
   */
  getSource() {
    return firebase.database();
  }

  /**
   * Busca simples
   * @return {Promise<any>}
   */
  find(): Promise<any> {
    return new Promise( (resolve: any, reject: any) => {
      let ref = this.getRef();

      ref.once('value')
        .then ( (snapshot: any) => {
          let results :any = [];
          snapshot.forEach ((snap: any) => {
            let entity = this.newEntity();
            this.patchEntity(entity, snap.val());
            results.push(entity);
          });
          resolve(results);
        })
        .catch( (err: any) => {
          reject(err);
        });
    });
  }

  /**
   *
   * @param {string} objectId
   * @return {Promise<any>}
   */
  get(objectId: string): Promise<any> {
    return new Promise((resolve:any, reject:any) => {
      let ref = this.getRef();

      ref.child(objectId)
        .once( 'value')
        .then( (snap: any) => {
          if (_.size(snap)) {
            let entity = this.buildEntity(snap.val());
            resolve(entity);
          } else {
            reject({message: "not-found"});
          }

        })
        .catch((err: any) => {
          reject(err);
        })
    });
  }

  /**
   *
   * @param {Entity} entity
   * @return {Promise<any>}
   */
  save(entity: Entity): Promise<any> {
    return new Promise( (resolve: any, reject: any) => {
      let ref = this.getRef(), save;

      if (entity.id) {
        save = ref.child(entity.id);
      } else {
        save = ref.push();
        entity.id = save.key;
        entity.created = firebase.database.ServerValue.TIMESTAMP;
      }
      // always ?!
      entity.updated = firebase.database.ServerValue.TIMESTAMP;

      save.update(entity)
        .then( () => resolve(entity))
        .catch( (err: any) => reject(err) );
    });
  }

  /**
   *
   * @param {string} objectId
   * @return {Promise<any>}
   */
  remove(objectId: string): Promise<any> {
    return new Promise( (resolve: any, reject: any) => {
      this.get(objectId)
        .then( (entity: any) => {
          let ref = this.getRef();
          ref.child(objectId).set(null)
            .then( () => {
              resolve(entity);
            })
            .catch( (err) => {
              reject(err);
            });
        })
        .catch( (err) => {
          reject(err);
        });
    });
  }
}
