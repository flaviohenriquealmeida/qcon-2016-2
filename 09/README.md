**IMPORTANTE**: em seu terminal de preferência, dentro desta pasta, baixe todas as dependências do projeto do backend através do comando `npm install` antes de continuar. Em seguida, dentro da pasta `public` execute também `npm install` para baixar as dependências do cliente (Angular2).

# EXERCÍCIO 8

Nossa aplicação é capaz de adicionar um palestrante e removê-lo, contudo onde está a alteração? Precisamos atualizá-la para que essa funcionalidade tão corriqueira esteja presente.

## PASSO 1

Precisamos ter uma rota especial que aceite receber um parâmetro. Por exemplo, se acessarmos `localhost:3000/cadastro/1` precisamos executar uma rota que também carregue o componente `Cadastro`, mas disponbilizando para ele o ID do palestrante que queremos alterar. 

Vamos alterar `public/app/app.ts` e adicionar mais uma rota, a `/cadastro/:id`:

```
// código anterior omitido
@RouteConfig([
     { 
        path: '/',
        name: 'Home',
        component: Principal
    },
    { 
        path: '/cadastro',
        name: 'Nova',
        component: Cadastro
    },
    { 
        path: '/cadastro/:id',
        name: 'Alterar',
        component: Cadastro
    },

    {
        path: '/**', redirectTo: ['Home']
    }
]) 
// código posterior omitido
```

Entenda `:id` como um curinga, que pode assumir qualquer valor. Sendo assim, se acessarmos `localhost:3000/cadastro` acessamos `Cadastro`, mas sem passar o ID, contudo, se acessarmos `localhost:3000/cadastro/1` estaremos acessando o mesmo componente, mas dessa vez passando o ID 1. 

## PASSO 2

Agora, precisamos transformar na lista de palestrantes do template de `Principal` o nome do palestrante em um link que ao ser clicado saberá inteligentemente montar a URL para o componente `Cadastro` passando o ID do palestrante. 

```
<!-- public/app/principal/components/principal.html -->
<!-- código anterior omitido -->
<table class="table table-bordered table-striped">
        <tr *ngFor="#palestrante of palestrantes">

            <td>
                <a [routerLink]="['Alterar', {id : palestrante._id}]">{{palestrante.nome}}</a>
            </td>
            
            <td>{{palestrante.palestra}}</td>
            <td>
                <button (click)="remove(palestrante)" class="btn btn-danger">
                    Remover
                </button>
            </td>
        </tr>
</table>
<!-- código posterior omitido -->
```

Veja que usamos a diretiva `routerLink`, mas que agora recebe como parâmetro o ID d palestrante.

Faça um teste. Recarregue sua aplicação e experimente clicar no link. O componente `Cadastro` deve ser exibido, contudo não exibimos os dados da foto. Precisamos de alguma maneira saber qual ID da foto foi passado na URL para que possamos buscá-lo do banco. Para isso precisamos pedir ajuda de `RouteParams`. Precisamos importá-lo e depois recebê-lo no construtor de `Cadastro` via injeção de dependência:

```
// public/app/cadastro/components/cadastro.ts

import {Component} from 'angular2/core';
import {PalestranteService} from '../../services/palestrante-service';
// imporando RouteParams 
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/components/cadastro.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PalestranteService]
})
export class Cadastro {

    palestrante = {};
    service: PalestranteService;
    
    // injetando o serviço!
    constructor(service: PalestranteService,  params: RouteParams) {

```
## PASSO 3

Agora precisamos verificar se o ID foi foi passado como parâmetro. Se foi, é porque estamos em uma alteração e precisamos consultar uma API e buscar o palestrante. Se não foi passado, não fazemos nada, pois é uma inclusão. Porém, antes de realizamos essa busca, precisamos criar em nossa API aquela que busca um palestrante pelo seu ID.

Vamos alterar `app/api/palestrantes.js`:

```
// código anterior omitido

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
    })
    .get(function(req, res) {

        // novidade!
        
        var id = req.params.id;
        Palestrante.findById(id)
            .then(function(palestrante) {
               res.json(palestrante); 
            }, function(err) {
                console.log(err);
            });
    });
```

Não esqueça de reiniciar seu servidor.

## PASSO 4

Agora que temos nossa API de busca pronta, vamos alterar `PalestranteService` e adicionar o método `buscaPorId` que acessará a API que acabamos de criar:

```
// app/services/palestrante-service.ts
// código anterior omitido    

buscaPorId(id) {
    return this.http.get('/palestrantes/' + id);
}

// código posterior omitido
```

## PASSO 5

Agora podemos buscar o palestrante pelo seu ID caso ele tenha sido passsado!

```
// app/cadastro/components/cadastro.ts

// código anterior omitido
  constructor(service: PalestranteService,  params: RouteParams) {
       
        this.service = service; 
        
        // novidade!

        let id = params.get('id');
        if(id) {
            this.service.buscaPorId(id)
                .subscribe((res) => this.palestrante = res.json());
        }
           
    }
// código posterior omitido
```

## PASSO 6

Preste atenção no método `grava` de `Cadastro`:

```
// observe o código, ele já existe!
    grava() {
        
        this.service.cadastra(this.palestrante)
            .subscribe(() => this.palestrante = {},
                (error) => console.log(error));   
    }
```
Se estamos incluindo, nosso serviço realizará um POST, e na atualização? Ele precisará fazer um PUT! E agora?

Basta alterarmos `PalestranteService` e dentro do método `cadastra` testamos se o palestrante passado como parâmetro possui ID. Se possuir, é porque estamos realizando uma atualização. Se não existir, é porque é uma inclusão. Vamos alterar o método `cadastra` de `app/services/palestrante-service.ts`:

```
// app/services/palestrante-service.ts`:
// código anterior omitido

    cadastra(palestrante) {
       
       if(palestrante._id) {

         return this.http.put('/palestrantes/' + palestrante._id,
           JSON.stringify(palestrante), { headers: this.headers });
            
                       
       } else {
         return this.http.post('/palestrantes', 
           JSON.stringify(palestrante), { headers: this.headers })
       }
    }
// código posterior omitido
```

## PASSO 7

Estamos realizando uma requisição do tipo PUT para atualizar o palestrante. Mas nosso backend não suporta esse verbo ainda. 

Pare o servidor e altere `app/api/palestrantes.js`:

```
// código anterior omitido

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
            })
            .get(function(req, res) {
                var id = req.params.id;
                Palestrante.findById(id)
                    .then(function(palestrante) {
                       res.json(palestrante); 
                    }, function(err) {
                        console.log(err);
                    });
            })
            .put(function(req, res) {

                // novidade aqui

                Palestrante
                    .findByIdAndUpdate(req.params.id, req.body)
                    .then(function(foto) {
                        res.json(foto);
                    }, function(err) {
                        console.log(err);
                        res.sendStatus(500);
                    });
            });
```
Reinicie o servidor.

## PASSO 8

Faça um teste. Selecione alguns palestrantes da lista e experimente alterar alguns dados e volte para a listagem. O palestrante deve aparecer atualizado.

## PASSO 9

Fica chato ficar voltado para `Principal`, que tal adicionarmos um botão chamado `Voltar` em `Cadastro`? Primeiro, precisamos importar `ROUTER_DIRECTIVES` e adicioná-lo na lista de diretivas que nosso componente depende:

```
// app/cadastro/components/cadastro.ts

import {Component} from 'angular2/core';
import {PalestranteService} from '../../services/palestrante-service';
// importou ROUTER_DIRECTIVES
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/components/cadastro.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PalestranteService]
})
```

E agora, vamos adicionar nosso botão:

```
<!-- app/cadastro/components/cadastro.html -->
<!-- logo abaixo do botão Cadastrar -->

<a [routerLink]="['Home']" class="btn btn-default">Voltar</a>

<!-- código posterior omitido -->
```
## PASSO 10

Teste seu resultado!
