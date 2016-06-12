'use strict';

angular.module('rehApp')

        .controller('IndexController', function ($scope, $state, AuthService, AUTH_EVENTS, ApplicationMetadataService) {
            $scope.username = window.localStorage.getItem("username");
            $scope.position = window.localStorage.getItem("position");

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

            $scope.setCurrentUsername = function (user) {
                window.localStorage.setItem("username", user.name + ' ' + user.surname);
                $scope.username = window.localStorage.getItem("username");
            };

            $scope.setCurrentPosition = function (position) {
                window.localStorage.setItem("position", position);
                $scope.position = window.localStorage.getItem("position");
            };

            $scope.$state = $state;
            $scope.application = ApplicationMetadataService;
        });
