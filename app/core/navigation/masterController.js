(function () {
    'use strict';

    angular.module('rehApp.nav.master', ['rehApp.loginService'])

            .controller('MasterController', MasterController);

    MasterController.$inject = ['$scope', '$state', 'AuthService', 'AUTH_EVENTS'];

    function MasterController($scope, $state, AuthService, AUTH_EVENTS) {
        var vm = this;

        vm.username = window.localStorage.getItem("username");
        vm.position = window.localStorage.getItem("position");

        $scope.$on(AUTH_EVENTS.sessionTimeout, function (event) {
            console.log("Sesja wygasła! Musisz zalogować się ponownie.");
        });

        $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
            console.log("Nieuprawniony! Nie masz uprawnień, aby zobaczyć ten zasób.");
        });

        $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
            AuthService.logout();
            $state.go('root.login');
            console.log("Sesja wygasła! Musisz zalogować się ponownie.");
        });

        vm.setCurrentUsername = function (user) {
            window.localStorage.setItem("username", user.name + ' ' + user.surname);
            vm.username = window.localStorage.getItem("username");
        };

        vm.setCurrentPosition = function (position) {
            window.localStorage.setItem("position", position);
            vm.position = window.localStorage.getItem("position");
        };

        vm.$state = $state;

        vm.logout = function () {
            AuthService.logout();
            $state.go('root.login');
        };
    }
})();
