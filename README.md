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
## adicao de nova rota

Adicionar my-router.ts para /src/routes
...
importe sua rota em dispatcher `/src/routes/dipatcher.ts`

```
import {MyRoute} from './my-route'

...
    // Dentro do método dispatch dispatch
    public static dispatch(router) {
    ...
        MyRoute.connect(router);
    ...
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