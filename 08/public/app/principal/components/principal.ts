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
    
    http: Http;
    
    constructor(http: Http) {
        
        this.http = http;
        
        http.get('/palestrantes')
			.subscribe(
				res => this.palestrantes = res.json(),
				error => console.log(error));        
    }

    remove(palestrante) {

        this.http.delete('/palestrantes/' + palestrante._id)
            .subscribe(
                () => {
                    let indice = this.palestrantes.indexOf(palestrante);
                    this.palestrantes.splice(indice, 1);
                },
                (error) => console.log('Não foi possível remover a foto'));
    }
}