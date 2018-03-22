// imports

export class BaseModel {
  public source:any;

  public getSource(){
    return this.source;
  }

  public get(id) {

  }
}

/*

Conter os metodos padroes para crud pré implementados
  => no baseModel
    => cada extensao como a entidade

* A ideia de manter um source para o cara fazer a query como quiser qdo necessario

Model.getSource() => return firebase.database();
                  => return Parse

Model.findOne(id) => {Entidade}
  Model.findOne({field : value})

  ...
Model.findAll(search?) => [Entidade]
  {field = value}
  {field > value}
  {field < value}
Model.save()
  => matchSchema()
  =>
FirebaseDriver()

Model.setDriver(new FirebaseDriver(config.driver));

  driver.setCollection(Model.table);

  driver.get(id);
*/