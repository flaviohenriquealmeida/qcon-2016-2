import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Principal} from './principal/components/principal';
import {Cadastro} from './cadastro/components/cadastro';

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
        path: '/**', redirectTo: ['Home']
    }
])
@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
export class App {} 
