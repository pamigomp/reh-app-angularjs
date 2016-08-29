(function () {
    'use strict';

    angular.module('rehApp.nav.breadcrumbs', ['ui.router'])

            .controller('BreadcrumbsController', BreadcrumbsController);

    BreadcrumbsController.$inject = ['$scope', '$state', '$stateParams'];

    function BreadcrumbsController($scope, $state, $stateParams) {
        $scope.$state = $state;
        $scope.$stateParams = $stateParams;
    }
})();
