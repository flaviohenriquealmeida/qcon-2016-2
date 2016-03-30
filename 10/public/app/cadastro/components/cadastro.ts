import {Component} from 'angular2/core';
import {PalestranteService} from '../../services/palestrante-service';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

@Component({
    selector: 'cadastro',
    templateUrl: 'app/cadastro/components/cadastro.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PalestranteService]
})
export class Cadastro {

	palestrante = {};
    service: PalestranteService;
    
    constructor(service: PalestranteService,  params: RouteParams) {
       
        this.service = service; 
        
        let id = params.get('id');
        if(id) {
            this.service.buscaPorId(id)
                .subscribe((res) => this.palestrante = res.json());
        }
           
    }
    
	grava() {
        
        this.service.cadastra(this.palestrante)
            .subscribe(() => this.palestrante = {},
                (error) => console.log(error));   
	}
}