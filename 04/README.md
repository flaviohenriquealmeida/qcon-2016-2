**IMPORTANTE**: em seu terminal de preferência, dentro desta pasta, baixe todas as dependências do projeto do backend através do comando `npm install` antes de continuar. Em seguida, dentro da pasta `public` execute também `npm install` para baixar as dependências do cliente (Angular2).

# EXERCÍCIO 4

Hoje conseguimos buscar nossa lista de palestrantes através da nossa API, no entanto ainda não somos capazes de incluir novos participantes. Vamos preparar o terreno para que possamos criar nosso cadastro.

## PASSO 1

Vamos criar o componente `Cadastro` que representa nosso cadastro:

```
// public/app/cadastro/components/cadastro.ts

import {Component} from 'angular2/core';

@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/cadastro.html'
})
export class Cadastro {}
```

Até agora não há novidades. Vamos também definir o seu template, que exibirá apenas um título.

```
<!-- public/app/cadastro/components/cadastro.html -->

<div class="container">
    <h2 class="text-center">Cadastro de Palestrantes</h2>
    <form>
        <div class="form-group">
            <label>Nome</label>
            <input class="form-control">
        </div>
        <div class="form-group">
            <label>Palestra</label>
            <input class="form-control">
        </div>
        <button class="btn btn-primary">Cadastrar</button>
    </form>
</div>
```

Temos um problema. Hoje, `index.html` exibe nosso componente `Principal` assim que é carregado. Não podemos simplesmente trocar para `Cadastro`. Precisamos arrumar uma maneira de carregar um ou outro componente de acordo com o que o usuário deseja. Para isso, criaremos rotas, mas dessa vez no lado da aplicação Angular. Angular processará essas URL's especial e carregará os componentes que tiverem sido associadas à esta URL. Não confundir essas rotas com as rotas que criamos no lado do servidor, nossa API.

## PASSO 3

Para podemos usar o sistema de rotas do Angular, precisamos carregar seu módulo específico, que não faz parte do core do Angular:


```
// public/index.html
<!-- como último script, após a importação do módulo http  -->
<script src="node_modules/angular2/bundles/router.dev.js"></script>
```

## PASSO 4

Vamos criar o componente `App` que centralizará todas as configurações de rotas da nossa aplicação. Ele é um componente como outro qualquer e precisa do decorator `Component`.

```
// public/app/app.ts

import {Component} from 'angular2/core';
import {Principal} from './principal/components/principal';
import {Cadastro} from './cadastro/components/cadastro';

@Component({
    selector: 'app'
})
export class App {}
```

Mas onde definiremos as rotas da nossa aplicação? É através do decorator `RouteConfig` que importamos de `angular2/router`:

```
// public/app/app.ts

import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {Principal} from './principal/components/principal';
import {Cadastro} from './cadastro/components/cadastro';

@Component({
    selector: 'app'
})
@RouteConfig([])
export class App {}
```

## PASSO 5

Veja que `RouteConfig` recebe um array como parâmetro. Cada objeto deste array define o `path`, o `name` e o `component` a ser carregado:

```
// public/app/app.ts

import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {Principal} from './principal/components/principal';
import {Cadastro} from './cadastro/components/cadastro';

@Component({
    selector: 'app'
})
@RouteConfig([
     { 
        path: "/",
        name: "Home",
        component: Principal
    },
    { 
        path: "/cadastro",
        name: "Nova",
        component: Cadastro
    },
    {
        path: '/**', redirectTo: ['Home']
    }
])
export class App {}
```

Por exemplo, se acessarmos o `localhost:3000/cadastro`, o componente `Cadastro` será carregado. Se por acaso acessarmos uma rota que não exite, seremos direcionado para `Principal`. Cada rota pode ter um nome, um apelido para podermos referenciá-la não só na configuração de rotas, mas na hora que formos criar links em nossos templates.

## PASSO 6

Veja que nosso componente `App` não tem um template ainda. É neste template que usaremos a diretiva `RouterOutlet`. É dentro dessa diretiva que os componentes das nossas rotas serão carregados. Podemos dizer que é uma grande lacuna em `App` para carregar outras "páginas". Mas para usarmos essa diretiva, precisaremos importá-la ou importar todas as diretivas de `angular2/router` de uma vez através de `ROUTER_DIRECTIVES`:


```
// public/app/app.ts

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Principal} from './principal/components/principal';
import {Cadastro} from './cadastro/components/cadastro';

@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
     { 
        path: "/",
        name: "Home",
        component: Principal
    },
    { 
        path: "/cadastro",
        name: "Nova",
        component: Cadastro
    },
    {
        path: '/**', redirectTo: ['Home']
    }
])
export class App {}
```

## PASSO 7

No lugar de carregarmos `Principal` no bootstrap (inicialização) da nossa aplicação Angular, vamos carregar `App`. Vamos alterar `public/app/boot.ts`:

```
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {App} from './app'; // agora import App, não é mais Principal
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from "angular2/router"; 

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS]); // iniciando App
```

## PASSO 8

Precisamos ainda realizar mais alguma alterações em `public/index.html`. Vamos adicionar a tag `<base href="/">` no `head` da página e substituir `<principal>` por `<app>`. 

```
<!-- adiciona no head -->
<base href="/">
```

```
<!-- alterando o componente -->

<body>
    <app>Carregando...</app>    
</body>
```

## PASSO 8

Tem teria se acessarmos `localhost:3000/cadastro` o componente `Cadastro` será carregado e exibido em `<router-outlet>` de `App`. A mesma coisa para o endereço `localhost:3000/` que por padrão carregará o componente `Principal`, mas nada funcionará por enquanto.

Angular2 por padrão depende que seu servidor retorne sempre `index.html` para qualquer uma dessas rotas. Em outras palavras, dizemos que Angular2 usa o HTML5 Mode para evitar o uso de `#` nas URLs.

Precisamos alterar `app/config/express.js` e retornar `index.html`, mas somente se o recurso acessado não existir, porque as rotas de nossas API's precisam continuar a existir:


```
// app/config/express.js

var express = require('express');
var app = express()
    ,consign = require('consign')
    ,path = require('path'); // importou path

app.use(express.static('public'));

consign({cwd: 'app'})
    .include('api')
    .into(app);

// novidade!
app.all('/*', function(req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;
```

## PASSO 9

Pare e inicie o servidor novamente para a alteração tenha efeito. Experimente acessar `localhost:3000` e `localhost:3000/cadastro`. Os componentes `Principal` e `Cadastro` devem ser exibidos respectivamente.

## PASSO 10

Por fim, vamos adicionar um linck com visual de botão com ajuda do bootstrap que ao ser clicado executará a rota `/cadastro`, carregando assim um novo componente.

Não podemos nos esquecer de importar as diretivas de router, porque apenas as diretivas do core do Angular são carregadas automaticamente:
```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'principal',
    templateUrl: 'app/principal/components/principal.html',
    directives: [ROUTER_DIRECTIVES]
})
export class Principal {
    
   // código omitido
}
```

Por fim, vamos adicionar o nosso link que fará usado da diretiva `RouterLink`:

```
<!-- public/principal/components/principal.html -->

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
        </tr>
    </table>
</div>
```
