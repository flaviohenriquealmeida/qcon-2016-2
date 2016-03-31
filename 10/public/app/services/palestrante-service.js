System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var PalestranteService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            PalestranteService = (function () {
                function PalestranteService(http) {
                    this.http = http;
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/json');
                }
                PalestranteService.prototype.cadastra = function (palestrante) {
                    if (palestrante._id) {
                        return this.http.put('/palestrantes/' + palestrante._id, JSON.stringify(palestrante), { headers: this.headers });
                    }
                    else {
                        return this.http.post('/palestrantes', JSON.stringify(palestrante), { headers: this.headers });
                    }
                };
                PalestranteService.prototype.lista = function () {
                    return this.http.get('/palestrantes');
                };
                PalestranteService.prototype.remove = function (palestrante) {
                    return this.http.delete('/palestrantes/' + palestrante._id);
                };
                PalestranteService.prototype.buscaPorId = function (id) {
                    return this.http.get('/palestrantes/' + id);
                };
                PalestranteService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], PalestranteService);
                return PalestranteService;
            }());
            exports_1("PalestranteService", PalestranteService);
        }
    }
});
//# sourceMappingURL=palestrante-service.js.map