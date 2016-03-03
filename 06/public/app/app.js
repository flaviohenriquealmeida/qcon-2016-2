System.register(['angular2/core', 'angular2/router', './principal/components/principal', './cadastro/components/cadastro'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, principal_1, cadastro_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (principal_1_1) {
                principal_1 = principal_1_1;
            },
            function (cadastro_1_1) {
                cadastro_1 = cadastro_1_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                }
                App = __decorate([
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'Home',
                            component: principal_1.Principal
                        },
                        {
                            path: '/cadastro',
                            name: 'Nova',
                            component: cadastro_1.Cadastro
                        },
                        {
                            path: '/**', redirectTo: ['Home']
                        }
                    ]),
                    core_1.Component({
                        selector: 'app',
                        template: '<router-outlet></router-outlet>',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map