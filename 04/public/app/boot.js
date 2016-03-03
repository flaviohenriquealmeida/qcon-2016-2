System.register(['angular2/platform/browser', './principal/components/principal', 'angular2/http'], function(exports_1) {
    var browser_1, principal_1, http_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (principal_1_1) {
                principal_1 = principal_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(principal_1.Principal, [http_1.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=boot.js.map