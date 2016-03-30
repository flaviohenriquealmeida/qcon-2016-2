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