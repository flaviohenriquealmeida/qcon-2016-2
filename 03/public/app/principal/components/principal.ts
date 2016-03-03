import {Component} from 'angular2/core';

@Component({
	selector: 'principal',
	templateUrl: 'app/principal/components/principal.html'
})
export class Principal {
    
   palestrantes = [
		{"nome": "Flávio Almeida", "palestra" : "MEAN"},
		{"nome" : "Zeca Baleiro",  "palestra" : "Angular"},
		{"nome" : "Tião Galinha",  "palestra" : "Mongo"}
    ];
       
}