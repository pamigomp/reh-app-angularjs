'use strict';

angular.module('rehApp.directives.modal', [])

        .directive('modalDirective', function () {
            var directive = {
                scope: {
                    modalId: '@',
                    title: '@',
                    body: '@',
                    confirmButton: '&',
                    cancelButton: '&'
                },
                controller: ['$scope', function ($scope) {
                        $scope.closeModal = function () {
                            $(".modal-backdrop").remove();
                            $(".modal-open").css("overflow", "auto");
                        };
                    }],
                templateUrl: 'common/directives/modalView.html'
            };

            return directive;
        });
