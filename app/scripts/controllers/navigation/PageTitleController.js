'use strict';

angular.module('RehApp')

        .controller('PageTitleController', function ($scope, $state, ApplicationMetadataService) {
            $scope.getPageTitle = function () {
                var title = '';
                if (angular.isDefined($state.current.data) && angular.isDefined($state.current.data.title)) {
                    title += $state.$current.data.title + ' - ';
                }
                title += ApplicationMetadataService.getApplicationTitle();
                return title;
            };
        });
