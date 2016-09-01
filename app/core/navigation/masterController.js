(function () {
    'use strict';

    angular.module('rehApp.nav.master', ['rehApp.loginService', 'ui.router'])

            .controller('MasterController', MasterController);

    MasterController.$inject = ['$scope', '$state', 'AuthService', 'AUTH_EVENTS'];

    function MasterController($scope, $state, AuthService, AUTH_EVENTS) {
        var vm = this;

        vm.logout = logout;
        vm.position = window.localStorage.getItem('position');
        vm.setCurrentUsername = setCurrentUsername;
        vm.setCurrentPosition = setCurrentPosition;
        vm.username = window.localStorage.getItem('username');

        function setCurrentUsername(user) {
            window.localStorage.setItem('username', user.name + ' ' + user.surname);
            vm.username = window.localStorage.getItem('username');
        }

        function setCurrentPosition(position) {
            window.localStorage.setItem('position', position);
            vm.position = window.localStorage.getItem('position');
        }

        function logout() {
            AuthService.logout();
            $state.go('root.login');
        }

        $scope.$state = $state;

        $scope.$on(AUTH_EVENTS.sessionTimeout, function (event) {
            console.log('Sesja wygasła! Musisz zalogować się ponownie.');
        });

        $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
            console.log('Nieuprawniony! Nie masz uprawnień, aby zobaczyć ten zasób.');
        });

        $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
            AuthService.logout();
            $state.go('root.login');
            console.log('Sesja wygasła! Musisz zalogować się ponownie.');
        });
    }
})();
