/* global expect */

"use strict";

describe("Modal directive", function () {
    var date, elm, scope;

    beforeEach(module("app.directives.modal"));

    it('should ...', function () {
        return inject(function ($compile, $rootScope) {
            scope = $rootScope.$new();
            //...
        });
    });
});
