import {Component, Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
 
@Injectable()
export class PalestranteService {
    
    http: Http;
    headers: Headers;
    
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
        
    cadastra(palestrante) {
       
       if(palestrante._id) {

         return this.http.put('/palestrantes/' + palestrante._id,
           JSON.stringify(palestrante), { headers: this.headers });
            
                       
       } else {
         return this.http.post('/palestrantes', 
           JSON.stringify(palestrante), { headers: this.headers })
       }
    }
    
    lista() {
        return this.http.get('/palestrantes');	
    }   
    
    remove(palestrante) {
           return this.http.delete('/palestrantes/' + palestrante._id);
    } 
    
    buscaPorId(id) {
        return this.http.get('/palestrantes/' + id);
    }
}