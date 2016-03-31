System.register(['angular2/core', '../../services/palestrante-service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, palestrante_service_1, router_1;
    var Cadastro;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (palestrante_service_1_1) {
                palestrante_service_1 = palestrante_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Cadastro = (function () {
                function Cadastro(service, params) {
                    var _this = this;
                    this.palestrante = {};
                    this.service = service;
                    var id = params.get('id');
                    if (id) {
                        this.service.buscaPorId(id)
                            .subscribe(function (res) { return _this.palestrante = res.json(); });
                    }
                }
                Cadastro.prototype.grava = function () {
                    var _this = this;
                    this.service.cadastra(this.palestrante)
                        .subscribe(function () { return _this.palestrante = {}; }, function (error) { return console.log(error); });
                };
                Cadastro = __decorate([
                    core_1.Component({
                        selector: 'cadastro',
                        templateUrl: 'app/cadastro/components/cadastro.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [palestrante_service_1.PalestranteService]
                    }), 
                    __metadata('design:paramtypes', [palestrante_service_1.PalestranteService, router_1.RouteParams])
                ], Cadastro);
                return Cadastro;
            }());
            exports_1("Cadastro", Cadastro);
        }
    }
});
//# sourceMappingURL=cadastro.js.map