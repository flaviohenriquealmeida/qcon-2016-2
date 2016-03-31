System.register(['angular2/core', 'angular2/router', '../../services/palestrante-service'], function(exports_1, context_1) {
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
    var core_1, router_1, palestrante_service_1;
    var Principal;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (palestrante_service_1_1) {
                palestrante_service_1 = palestrante_service_1_1;
            }],
        execute: function() {
            Principal = (function () {
                function Principal(service) {
                    var _this = this;
                    this.palestrantes = [];
                    this.service = service;
                    this.service.lista().subscribe(function (res) { return _this.palestrantes = res.json(); }, function (error) { return console.log(error); });
                }
                Principal.prototype.remove = function (palestrante) {
                    var _this = this;
                    this.service.remove(palestrante)
                        .subscribe(function () {
                        var indice = _this.palestrantes.indexOf(palestrante);
                        _this.palestrantes.splice(indice, 1);
                    }, function (error) { return console.log('Não foi possível remover a foto'); });
                };
                Principal = __decorate([
                    core_1.Component({
                        selector: 'principal',
                        templateUrl: 'app/principal/components/principal.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [palestrante_service_1.PalestranteService]
                    }), 
                    __metadata('design:paramtypes', [palestrante_service_1.PalestranteService])
                ], Principal);
                return Principal;
            }());
            exports_1("Principal", Principal);
        }
    }
});
//# sourceMappingURL=principal.js.map