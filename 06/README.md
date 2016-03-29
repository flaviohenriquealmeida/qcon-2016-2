# EXERCÍCIO 6

Vamos concluir nosso cadastro de palestrantes.

## PASSO 1

Precisamos criar um endpoint que seja capaz de lidar com requisições do tipo POST para a rota `/palestrantes`.

Altere **app/api/palestrantes.js**. Vamos encadear uma chamada à função `.post` para a routa `/palestrantes:

```
// app/api/palestrantes.js

var mongoose = require('mongoose');

module.exports = function(app) {
    
    var Palestrante = mongoose.model('Palestrante');
    
    app.route('/palestrantes')
        .get(function(req, res) {
            Palestrante
                .find()
                .then(function(palestrantes) {
                    res.json(palestrantes);     
                });
        })
        .post(function(req, res) {

            // precisamos receber os dados do palestrante. Como?
        });
};
```

## PASSO 2

Quando nosso cliente Angular enviar os dados do palestrante (ainda precisamos implementar essa funcionalidade) eles serão enviados através 
do método POST. Mas onde teremos acesso a esses dados? O Express possui o middleware `body-parser`. Quando ativado, todos os dados enviados na requisição serão acessíveis através de `req.body`, sendo assim, `req.body` será nosso palestrante! **Precisamos ativar o middleware**.

**Altere** `app/config/express.js` e importe o módulo, configurando-o logo em seguida. Seu arquivo deverá ficar assim:

```
// app/config/express.js

var express = require('express');
var app = express()
    ,consign = require('consign')
    ,bodyParser = require('body-parser'); // novidade! importando o middlware

app.use(express.static('public'));

// novidade! configuração do body parser
app.use(bodyParser.json());

consign({cwd: 'app'})
    .include('models')
    .then('api')
    .into(app);


module.exports = app;

```
## PASSO 3 

Agora que já sabemos que `req.body` é nosso palestrante enviado pelo nosso cliente Angular, podemos usar a função `Palestrante.create` do nosso modelo do Mongoose para gravá-lo no banco. Como resposta, enviaremos para o cliente o palestrante, só que dessa vez com seu ID preenchido:

```
// app/api/paletrantes.js

var mongoose = require('mongoose');

module.exports = function(app) {
    
    var Palestrante = mongoose.model('Palestrante');
    
    app.route('/palestrantes')
        .get(function(req, res) {
            Palestrante
                .find()
                .then(function(palestrantes) {
                    res.json(palestrantes);     
                });
        })
        .post(function(req, res) {
            Palestrante
            .create(req.body)
            .then(function(palestrante) {
                // devolve o palestrante, mas com o ID preenchido
                res.status(200).send(palestrante);
            });
        });
};
```

## PASSO 4

Vamos voltar para nosso cliente Angular. Nosso componente `Cadastro` tem que ser capaz de receber os dados do formulário. Vamos adicionar a propriedade `palestrante` que receberá essas informações e um método que ao ser chamado exibirá no console a propriedade `palestrante`. Isso nos será útil inicialmente para sabermos se realmente os dados inseridos no formulário estão chegando em nossa propriedade:

```
// public/app/cadastro/components/cadastro.ts

import {Component} from 'angular2/core';

@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/components/cadastro.html'
})
export class Cadastro {

  palestrante = {};

  grava() {

    console.log(this.palestrante);
  }

}
```

## PASSO 5

Agora precisamos realizar uma associação entre os input's do nosso formulário com a propriedade `palestrante` de cadastro. Para isso, usaremos a diretiva `ngModel`:

```
<!-- public/app/cadastro/components/cadastro.html -->

<div class="container">
  <h2 class="text-center">Cadastro de Palestrantes</h2>
  <form>
      <div class="form-group">
          <label>Nome</label>
          <input [(ngModel)]="palestrante.nome" class="form-control">
      </div>
      <div class="form-group">
          <label>Palestra</label>
          <input [(ngModel)]="palestrante.palestra" class="form-control">
      </div>
      <button class="btn btn-primary">Cadastrar</button>
  </form>
</div>
```

Você deve estar estranhando a sintaxe `[(ngModel)]`. Em Angular, o `[]` indica uma associação unidirecional da fonte de dados para a view (somente leitura). O `()` é uma associação unidirecional da view para a fonte de dados utilizado quando realizamos uma associação de eventos permitindo escrita na fonte de dados. Por debaixo dos panos a diretiva `ngModel` dispara um evento que atualiza a fonte de dados ligada com o input, por isso a necessidade de `()`. 

Pela natureza dinâmica de um objeto JavaScript, as propriedade `nome` e `palestra` serão adicionadas dinamicamente no objeto da propriedade `palestrante`.

## PASSO 5

Precisamos agora executar o método `grava` do nosso componente `Cadastro` quando o formulário for submetido. Neste caso, queremos fazer uma associação de evento, em nosso caso `submit`.

Para isso, adicione o atributo `submit` no `<form>`. Ele receberá como valor uma expressão que é a chamada do método `grava`:

```
<div class="container">
  <h2 class="text-center">Cadastro de Palestrantes</h2>
  <form (submit)="grava()"> <!-- aqui a novidade ! -->
      <div class="form-group">
          <label>Nome</label>
          <input [(ngModel)]="palestrante.nome" class="form-control">
      </div>
      <div class="form-group">
          <label>Palestra</label>
          <input [(ngModel)]="palestrante.palestra" class="form-control">
      </div>
      <button class="btn btn-primary">Cadastrar</button>
  </form>
</div>
```

Preencha os dados for formulário que clique no botão `Cadastrar`. Será exibido no console do seu browser os dados do palestrante.


## PASSO 5

Chegou a hora de enviarmos os nosso palestrante para o servidor e persisti-lo em nosso banco. Para isso dependeremos mais uma vez do serviço `Http`. Contudo, precisaremos elaborar o cabeçalho que será enviado com os dados do palestrantes. Por isso é necessário importar a classe `Headers`:

```
import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/components/cadastro.html'
})
export class Cadastro {

    palestrante = {};
    http: Http;
    
    constructor(http: Http) {
        this.http = http;    
    }
    
    grava() {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('/palestrantes', 
            JSON.stringify(this.palestrante), { headers: headers })
            .subscribe(() => this.palestrante = {},
                (error) => console.log(error));   
    }
}
```

Veja também que foi necessário converte `this.palestrate` para o formato JSON no tipo string. Quando a operação é realizada com sucesso, limpamos o formulário através de `this.palestrante = {}`.