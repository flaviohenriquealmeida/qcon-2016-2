System.register(['angular2/platform/browser', './principal/components/principal'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, principal_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (principal_1_1) {
                principal_1 = principal_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(principal_1.Principal);
        }
    }
});
//# sourceMappingURL=boot.js.map