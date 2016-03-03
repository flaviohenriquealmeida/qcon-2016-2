# EXERCÍCIO 8

Já pensou se o endereço da nossa API muda? Que tal isolar todo código de acesso da nossa API em um serviço isolado? Com isso, podemos injetá-lo em qualquer componente que necessite se comunicar com nosso servidor.


## PASSO 1

Vamos criar `public/app/services/palestrante-service.ts`. Atenção! Ele precisa estar decorado com `@Injectable` caso contrário Angular não conseguirá resolver suas dependências.

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

Agora vamos utilizá-lo em `Principal`. Remove a importação de `Http` e importe o novo serviço:

```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {PalestranteService} from '../../services/palestrante-service';

@Component({
    selector: 'principal',
    templateUrl: 'app/principal/components/principal.html',
    directives: [ROUTER_DIRECTIVES]
})
export class Principal {
    
    palestrantes = [];
    service: PalestranteService;
    
    constructor() {
     
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

Faça a mesma coisa para `Cadastro`. Além de remover a importação de `Http`, remova também de `Headers`:

```
// public/app/cadastro/components/cadastro.ts

import {Component} from 'angular2/core';
import {PalestranteService} from '../../services/palestrante-service';

@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/components/cadastro.html'
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