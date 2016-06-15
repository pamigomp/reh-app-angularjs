'use strict';

angular.module('rehApp.nav.header', [])

        .controller('HeaderController', ['APP_NAME', function (APP_NAME) {
                var vm = this;

                vm.appName = APP_NAME;
            }]);
