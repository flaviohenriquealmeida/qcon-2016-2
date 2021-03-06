import {Component} from 'angular2/core';
import {PalestranteService} from '../../services/palestrante-service';

@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/components/cadastro.html',
    providers: [PalestranteService]
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