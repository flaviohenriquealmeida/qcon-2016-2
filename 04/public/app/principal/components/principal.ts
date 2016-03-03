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