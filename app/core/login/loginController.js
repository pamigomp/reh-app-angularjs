(function () {
    'use strict';

    angular.module('rehApp.login', ['rehApp', 'ui.router'])

            .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', '$state', 'AUTH_EVENTS', 'AuthService', 'loginService'];

    function LoginController($rootScope, $scope, $state, AUTH_EVENTS, AuthService, loginService) {
        var vm = this;

        vm.login = login;

        function login(data) {
            vm.credentialsError = false;
            vm.loginError = false;

            loginService.verifyEmployeeCredentials(data.email)
                    .then(verifyEmployeeCredentialsSuccess, verifyEmployeeCredentialsFailure);

            function verifyEmployeeCredentialsSuccess(employeeCredentials) {
                if ((employeeCredentials.length > 0) && (data.password === employeeCredentials[0].password)) {
                    AuthService.login(employeeCredentials[0]).then(loginSuccess, loginFailure);
                } else {
                    vm.credentialsError = true;
                    vm.loginError = false;
                }

                function loginSuccess(authenticated) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $state.go('root.dashboard', {}, {reload: true});
                    $scope.MC.setCurrentUsername(employeeCredentials[0]);
                    $scope.MC.setCurrentPosition(employeeCredentials[0].position);
                    vm.credentialsError = false;
                    vm.loginError = false;
                }

                function loginFailure(err) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    vm.credentialsError = true;
                    vm.loginError = false;
                }
            }

            function verifyEmployeeCredentialsFailure() {
                vm.credentialsError = false;
                vm.loginError = true;
            }
        }
    }
})();
