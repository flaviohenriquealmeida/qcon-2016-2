///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {Principal} from './principal/components/principal';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(Principal, [HTTP_PROVIDERS]); 