'use strict';

angular.module('RehApp')

        .controller('LoginController', function ($scope, $state) {
            $scope.login = function () {
                $state.go('root.dashboard');
            };
        });
