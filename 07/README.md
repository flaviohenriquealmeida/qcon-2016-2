**IMPORTANTE**: em seu terminal de preferência, dentro deta pasta, baixe todas as dependências do projeto do backend através do comando `npm install` antes de continuar. Em seguida, dentro da pasta `public` execute também `npm install` para baixar as dependências do cliente (Angular2).

# EXERCÍCIO 7

Neste exercício, implementaremos a funcionalidade de remoção de palestrantes.

## PASSO 1

Precisamos adicionar mais uma rota em nosso servidor, desta vez, para lidar com requisições do tipo DELETE, inclusive nosso código deve ter capaz de obter o ID do palestrante que desejamos apagar.

**Altere** `api/palestrantes.js` criando a rota `/palestrantes/:id`. Veja que dessa vez ela possui o curinga `:id`. É através de `req.params.id` que teremos acesso ao ID enviado pelo nosso cliente Angular: 

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
            Palestrante
            .create(req.body)
            .then(function(palestrante) {
                res.status(200).send(palestrante);
            });
        });
    
    // novidade, nova rota com o curinga :id
    app.route('/palestrantes/:id')
        .delete(function(req, res) {
            var id = req.params.id;
            Palestrante.remove({"_id" : id})
            .then(
            function() {
                 res.status(204).end(); 
            }, 
            function(err) {
                return console.error(erro);
            });
        });
};
```

Como realizamos uma modificação em nosso servidor, precisamos reiniciá-lo.



## PASSO 2

Altere **public/app/principal/principal.html** adicionando mais uma coluna com o botão `remover`. O template deverá ficar assim:

```
<!-- public/app/principal/components/principal.html -->
<div class="jumbotron text-center">
    <h1>Workshop MEAN</h1>
</div>
<div class="container">
    <a [routerLink]="['Nova']" class="btn btn-primary">Novo Palestrante</a>
    <br>
    <br>
    <table class="table table-bordered table-striped">
        <tr *ngFor="#palestrante of palestrantes">
            <td>{{palestrante.nome}}</td>
            <td>{{palestrante.palestra}}</td>
            <td>
                <button class="btn btn-danger">
                    Remover
                </button>
            </td>
        </tr>
    </table>
</div>
```

## PASSO 3

Agora, vamos implementar o método `remove` em nosso componente `Principal`. Precisaremos aguardar `http` em uma propriedade de nossa classe para que seja possível utilizá-lo também fora de `constructor`:

```
// public/app/principal/principal.html 

import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'principal',
    templateUrl: 'app/principal/components/principal.html',
    directives: [ROUTER_DIRECTIVES]
})
export class Principal {
    
    palestrantes = [];
    
    http: Http;
    
    constructor(http: Http) {
        
        this.http = http;
        
        http.get('/palestrantes')
            .subscribe(
                res => this.palestrantes = res.json(),
                error => console.log(error));        
    }

    remove(palestrante) {

        this.http.delete('/palestrantes/' + palestrante._id)
            .subscribe(
                () => console.log('Foto removida com sucesso'),
                (error) => console.log('Não foi possível remover a foto'));
    }
}
```


## PASSO 4

Precisamos fazer com que o botão `Remover` chame o método `remove` de `Principal` passando o palestrante que desejamos resolver. Para isso, faremos uma associação unidirecional da view para a fonte de dados, ou seja, realizaremos um *event binding*:

```
<!-- public/app/principal/components/principal.html -->
<!-- código anterior omitido -->
<td>
    <button (click)="remove(palestrante)" class="btn btn-danger">
        Remover
    </button>
</td>
<!-- código posterior omitido -->
```

A sintaxe `(click)` siginfica uma associação de eventos, no caso o evento `click`. Quando ele for disparado, a função `remove` de `Principal` será chamada. Inclusive receberá como parâmetro o `palestrante` que usamos na diretiva `ngFor`. 

## PASSO 5 

Experimente remover uma foto. Ela não será removida! Contudo, se recarregarmos a página ela sumirá. O que esta acontecendo?

Estamos removendo a foto lá no servidor, contudo a lista que alimenta nosso componente ainda contém a foto que acabamos de remover. Uma solução seria buscar novamente os dados do servidor ou remover o item da lista. Vamos optar pelo último evitando assim mais uma requisição para nosso servidor:

```
// public/app/principal/components/principal.ts
// código anterior omitido

remove(palestrante) {

    this.http.delete('/palestrantes/' + palestrante._id)
        .subscribe(
            () => {
                let indice = this.palestrantes.indexOf(palestrante);
                this.palestrantes.splice(indice, 1);
            },
            (error) => console.log('Não foi possível remover a foto'));
}
// código posterior omitido
```
