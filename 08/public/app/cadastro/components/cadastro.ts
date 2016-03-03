import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';


@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/components/cadastro.html'
})
export class Cadastro {

	palestrante = {};
    http: Http;
    
    constructor(http: Http) {
        this.http = http;    
    }
    
	grava() {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

		this.http.post('/palestrantes', 
            JSON.stringify(this.palestrante), { headers: headers })
            .subscribe(() => this.palestrante = {},
                (error) => console.log(error));   
	}
}