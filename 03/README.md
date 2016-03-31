**IMPORTANTE**: em seu terminal de preferência, dentro desta pasta, baixe todas as dependências do projeto do backend através do comando `npm install` antes de continuar. Em seguida, dentro da pasta `public` execute também `npm install` para baixar as dependências do cliente (Angular2).

# EXERCÍCIO 3

Nossa lista de palestrante sé fixa, sendo uma propriedade da classe `Principal` com o decorator `Component` caracterizando o conjunto como um componente. Dessa vez consumiremos nossa API de palestrantes que criamos em nosso servidor.

## PASSO 1

Precisamos de `Http`, um serviço especializado em realizar requisições assíncronas para nosso servidor. 

Primeiro, precisamos importar o script que disponibiliza esse módulo para nossa aplicação:

```
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<title>Workshop MEAN</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/bootstrap-theme.min.css">

	<script src="node_modules/es6-shim/es6-shim.min.js"></script> 
    <script src="node_modules/systemjs/dist/system-polyfills.js"></script>
    <script src="node_modules/angular2/bundles/angular2-polyfills.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <script src="node_modules/rxjs/bundles/Rx.js"></script>
    <script src="node_modules/angular2/bundles/angular2.dev.js"></script>

    <!-- novidade -->
    <script src="node_modules/angular2/bundles/http.dev.js"></script>
```

## PASSO 2

O segundo passo é importá-lo em `public/app/principal/components/principal.ts`. Inclusive já vamos remover a lista deixa de palestrantes, deixando apenas uma lista vazia:

```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {Http} from 'angular2/http'; // importou Http

@Component({
	selector: 'principal',
	templateUrl: 'app/principal/components/principal.html'
})
export class Principal {
    
    palestrantes = []; // lista está vazia
}
```

## PASSO 3

E agora? Onde instanciaremos nosso serviço `Http` para que possamos utilizá-lo? Toda classe possui um `constructor` que é chamado sempre na sua inicialização. Parece ser um bom lugar:


```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
	selector: 'principal',
	templateUrl: 'app/principal/components/principal.html'
})
export class Principal {

	constructor() {
		let http = new Http(); // não funciona!
	}    
    
}
````

Não podemos simplesmente criar uma instância de `Http` porque sua criação é complexa. Precisamos passar uma conexão e parâmetros opcionais quando necessário. Contudo, o Angular vem com um sistema de injeção de dependências e quando usado com TypeScript permite realizar injeções baseadas em tipo. Vamos injetar no construtor o serviço `Http`:

```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
	selector: 'principal',
	templateUrl: 'app/principal/components/principal.html'
})
export class Principal {

	constructor(http: Http) {
		
	}    
    
}
```

Veja que a tipagem com TypeScript segue o padrão qu é o nome da variável ou parâmetro seguido de dois pontos e por fim o seu tipo. 

Isso ainda não é suficiente, porque Angular não saberá ainda criar a instância de `Http`. 

## PASSO 4

Precisamos registrar em nossa aplicação alguém que saiba criá-lo para que Angular solicite a criação de `Http` para ele. Fazemos isso através de um provider, em nosso caso `HTTP_PROVIDERS`. 

Vamos alterar `public/app/boot.ts` adicionar o `HTTP_PROVIDERS`:

```
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {Principal} from './principal/components/principal';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(Principal, [HTTP_PROVIDERS]); 
```

Excelente, assim que nosso componente `Principal` foi iniciado, Angular se encarregará de injetar em seu construtor o serviço `Http` para nós.

## PASSO 4

Vamos realizar uma requisição do tipo GET para o recurso `v1/palestrantes`:

```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
	selector: 'principal',
	templateUrl: 'app/principal/components/principal.html'
})
export class Principal {
    
    palestrantes = [];
    
    constructor(http: Http) {
        
        http.get('/palestrantes')			
    }
}
```

O retorno de `http.get` é um *observable stream*. Angular usa RxJS (Reactive Extensions for JavaScript). Para sermos sermos notificados da chegada dos dados, precisamos fazer nossa inscrição através da função `.subscribe`:

```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
	selector: 'principal',
	templateUrl: 'app/principal/components/principal.html'
})
export class Principal {
    
    palestrantes = [];
    
    constructor(http: Http) {
        
        http.get('/palestrantes')
        	.subscribe()			
    }
}
```
A função `subscribe` recebe dois parâmetros. Ambos são do tipo `Response`, contudo o primeiro nos dará à nossa lista retornada pelo servidor e o regundo à mensagens de erros caso algum problema aconteça durante o acesso à nossa API.

Podemos usar as *arrow functions* para tornar nosso código ainda menos verbobo:

```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
	selector: 'principal',
	templateUrl: 'app/principal/components/principal.html'
})
export class Principal {
    
    palestrantes = [];
    
    constructor(http: Http) {
        
        http.get('/palestrantes')
			.subscribe(
				res => this.palestrantes = res.json(),
				error => console.log(error));        
    }
}
```

Podemos usar `this` porque o escopo de uma arrow function é léxico, ou seja, não é estático e não muda entre contextos. Sendo assim, `this` referenciará a instância de `Principal`. 

Recarregando nossa página vemos que dessa vez exibimos os dados da nossa API. Excelente!
