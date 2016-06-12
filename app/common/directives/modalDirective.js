'use strict';

angular.module('rehApp.directives.modal', [])

        .directive('modalDirective', function () {
            return {
                scope: {
                    modalId: '@',
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
                templateUrl: 'common/directives/modalView.html'
            };
        });
