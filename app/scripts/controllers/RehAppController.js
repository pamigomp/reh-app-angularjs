'use strict';

angular.module('RehApp')

        .controller('RehAppController', function ($scope, $state, ApplicationMetadataService) {
            $scope.$state = $state;
            $scope.application = ApplicationMetadataService;
        });
