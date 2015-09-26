'use strict';

angular.module('RehApp')

        .controller('BreadcrumbsController', function ($scope, $state, $stateParams) {
            $scope.$state = $state;
            $scope.$stateParams = $stateParams;
        });
