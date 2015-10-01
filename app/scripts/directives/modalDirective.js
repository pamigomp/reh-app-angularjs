'use strict';

angular.module('RehApp')

        .directive('modalDirective', function () {
            return {
                scope: {
                    title: '@',
                    body: '@',
                    confirmButton: '&',
                    cancelButton: '&'
                },
                controller: function ($scope) {
                    $scope.closeModal = function () {
                        $(".modal-backdrop").remove();
                        $(".modal-open").css("overflow", "auto");
                    };
                },
                templateUrl: 'views/modal.html'
            };
        });