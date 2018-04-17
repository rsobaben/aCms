import {AcmsFirebaseModel} from "../lib/Model/acms-firebase-model";

/** classe de modelo base para os outros modelos da applicacao */
export class BaseModel extends AcmsFirebaseModel{
  constructor(table_name: string) { super(table_name); }
}