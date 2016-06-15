'use strict';

angular.module('rehApp.nav.breadcrumbs', [])

        .controller('BreadcrumbsController', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
                $scope.$state = $state;
                $scope.$stateParams = $stateParams;
            }]);
