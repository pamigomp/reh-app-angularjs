(function () {
    'use strict';

    angular.module('rehApp.login', ['rehApp', 'ui.router'])

            .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', '$state', 'AUTH_EVENTS', 'AuthService', 'loginService'];

    function LoginController($rootScope, $scope, $state, AUTH_EVENTS, AuthService, loginService) {
        var vm = this;

        vm.credentialsError = false;
        vm.loginError = false;

        vm.login = function (data) {
            loginService.verifyEmployeeCredentials(data.email).then(function (employeeCredentials) {
                if ((employeeCredentials.length > 0) && (data.password === employeeCredentials[0].password)) {
                    AuthService.login(employeeCredentials[0]).then(function (authenticated) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        $state.go('root.dashboard', {}, {reload: true});
                        $scope.MC.setCurrentUsername(employeeCredentials[0]);
                        $scope.MC.setCurrentPosition(employeeCredentials[0].position);
                        vm.credentialsError = false;
                        vm.loginError = false;
                    }, function (err) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                        vm.credentialsError = true;
                        vm.loginError = false;
                    });
                } else {
                    vm.credentialsError = true;
                    vm.loginError = false;
                }
            }, function () {
                vm.loginError = true;
                vm.credentialsError = false;
            });
        };
    }
})();
