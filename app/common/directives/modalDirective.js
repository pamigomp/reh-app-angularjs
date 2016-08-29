(function () {
    'use strict';

    angular.module('rehApp.directives.modal', [])

            .directive('modalDirective', modalDirective);

    modalDirective.$inject = [];

    function modalDirective() {
        var directive = {
            scope: {
                modalId: '@',
                title: '@',
                body: '@',
                confirmButton: '&',
                cancelButton: '&'
            },
            controller: modalDirectiveController,
            controllerAs: 'MDC',
            templateUrl: 'common/directives/modalView.html'
        };

        return directive;
    }

    modalDirectiveController.$inject = [];

    function modalDirectiveController() {
        var vm = this;

        vm.closeModal = function () {
            $('.modal-backdrop').remove();
            $('.modal-open').css('overflow', 'auto');
        };
    }
})();
