(function () {
    'use strict';

    angular.module('rehApp.terms.cancelled.list', ['rehApp.termsService', 'ui.router'])

            .controller('TermsCancelledListController', TermsCancelledListController);

    TermsCancelledListController.$inject = ['$state', 'termsService'];

    function TermsCancelledListController($state, termsService) {
        var vm = this;

        vm.loadTermsCancelled = loadTermsCancelled;

        function loadTermsCancelled() {
            vm.loadingCancelled = true;

            termsService.getTermsCancelled()
                    .then(getTermsCancelledSuccess, getTermsCancelledFailure);

            function getTermsCancelledSuccess(cancelledTerms) {
                if (cancelledTerms.length === 0) {
                    $state.go('root.terms.cancelled_empty');
                } else {
                    vm.cancelledTerms = cancelledTerms;
                    vm.loadingCancelled = false;
                }
            }

            function getTermsCancelledFailure() {
                $state.go('root.terms.cancelled_error');
            }
        }
    }
})();
