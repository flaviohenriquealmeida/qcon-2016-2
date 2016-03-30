**IMPORTANTE**: em seu terminal de preferência, dentro deta pasta, baixe todas as dependências do projeto do backend através do comando `npm install` antes de continuar. Em seguida, dentro da pasta `public` execute também `npm install` para baixar as dependências do cliente (Angular2).

# EXERCÍCIO 8

Já pensou se o endereço da nossa API muda? Que tal isolarmos todo código de acesso da nossa API em um serviço isolado? Com isso, podemos injetá-lo em qualquer componente que necessite se comunicar com nosso servidor.


## PASSO 1

Vamos criar `public/app/services/palestrante-service.ts`. Atenção! Ele precisa estar decorado com `@Injectable` caso contrário Angular não conseguirá resolver suas dependências quando ele for injetado.

```
// public/app/services/palestrante-service.ts

import {Component, Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
 
@Injectable()
export class PalestranteService {
    
    http: Http;
    headers: Headers;
    
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
        
    cadastra(palestrante) {
       
        return this.http.post('/palestrantes', 
            JSON.stringify(palestrante), { headers: this.headers })
    }
    
    lista() {
        return this.http.get('/palestrantes');  
    }   
    
    remove(palestrante) {
           return this.http.delete('/palestrantes/' + palestrante._id);
    } 
}
```

## PASSO 2

Agora vamos utilizá-lo em `Principal`. Remova a importação de `Http` e importe o novo serviço. Não esqueça de injetá-lo no construtor do componente `Principal`:

```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
// novidade aqui!
import {PalestranteService} from '../../services/palestrante-service';

@Component({
    selector: 'principal',
    templateUrl: 'app/principal/components/principal.html',
    directives: [ROUTER_DIRECTIVES]
})
export class Principal {
    
    palestrantes = [];
    service: PalestranteService;
    
    constructor(service: PalestranteService) {

        this.service = service;
        this.service.lista().subscribe(
                res => this.palestrantes = res.json(),
                error => console.log(error));        
    }

    remove(palestrante) {

        this.service.remove(palestrante)
            .subscribe(
                () => {
                    let indice = this.palestrantes.indexOf(palestrante);
                    this.palestrantes.splice(indice, 1);
                },
                (error) => console.log('Não foi possível remover a foto'));
    }
}
```

## PASSO 3

Isso ainda não é suficiente. Precisamos registrar `PalestranteService` como provider do próprio serviço:

```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {PalestranteService} from '../../services/palestrante-service';

@Component({
    selector: 'principal',
    templateUrl: 'app/principal/components/principal.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PalestranteService]
})
export class Principal {
   // código omitido
}
       
```

## PASSO 4 

Faça a mesma coisa para `Cadastro`. Além de remover a importação de `Http`, remova também de `Headers`, pois ele ficou encapsulado em nosso serviço. Não esqueça de adicionar o provider `PalestranteService`:

```
// public/app/cadastro/components/cadastro.ts

import {Component} from 'angular2/core';
import {PalestranteService} from '../../services/palestrante-service';

@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/components/cadastro.html',
    providers: [PalestranteService]
})
export class Cadastro {

    palestrante = {};
    service: PalestranteService;
    
    constructor(service: PalestranteService) {
       
        this.service = service;    
    }
    
    grava() {
        
        this.service.cadastra(this.palestrante)
            .subscribe(() => this.palestrante = {},
                (error) => console.log(error));   
    }
}
```

Agora é só testar o resultado.