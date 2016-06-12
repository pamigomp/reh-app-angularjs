'use strict';

angular.module('rehApp')

        .controller('BreadcrumbsController', function ($scope, $state, $stateParams) {
            $scope.$state = $state;
            $scope.$stateParams = $stateParams;
        });
