///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {App} from './app';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from "angular2/router"; 

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS]); 