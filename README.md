# aCms
Tentativa de padronização de organização de aplicações usando node.js
[typescript + expressjs+gulp+bootstrap]

## Running

Usando gulp para compilação do typescript
```
~/> gulp watch
```

Utilizando nodemon para ser desnecessário reiniciar aplicação sempre
```
~/> nodemon ./bin/www
```
## Adição de uma nova rota

Adicionar `my-router.ts` para `/src/routes`

```
import {Request, Response, NextFunction, Router, Application} from "express";
import {MyController} from '../controller/my-controller';
/** MyRouter class */
export class MyRouter{
    public static connect(router: Router, app: Application) {
        let Controller = new MyController(app);
        
        router.get('/my-route', (req: Request, res: Response, next: NextFunction) => {
           Controller.myFunction(req, res, next);
        });
    }
}
```

Importe sua rota em dispatcher `/src/routes/dipatcher.ts`

```
import {MyRoute} from './my-route'
...
export class Dispatcher {
    // Dentro do método dispatch dispatch
    public static dispatch(router) {
        IndexRouter.connect(router, this._app);
        MyRouter.connect(router, this._app);
    }
}
...
```

## Convenção de nomes

- classes:
    Server, Model, Controller, TestController

- files:
    server.ts, model.ts, test-controller.ts

- methods:
    doSomething, reallyDoSomething

- class properties"
    public [lowercase_underscored]
    private _[lowercase_underscored]

- class constants
    [UPPERCASE]