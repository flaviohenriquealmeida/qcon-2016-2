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
    
    constructor(http: Http) {
        
        http.get('/palestrantes')
			.subscribe(
				res => this.palestrantes = res.json(),
				error => console.log(error));        
    }
}