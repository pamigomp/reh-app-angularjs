(function () {
    'use strict';

    angular.module('rehApp.nav.header', [])

            .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['APP_NAME'];

    function HeaderController(APP_NAME) {
        var vm = this;

        vm.appName = APP_NAME;
    }
})();
