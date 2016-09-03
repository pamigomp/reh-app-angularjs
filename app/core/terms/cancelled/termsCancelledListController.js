(function () {
    'use strict';

    angular.module('rehApp.terms.cancelled.list', ['rehApp.termsService', 'ui.router', 'ngTable'])

            .controller('TermsCancelledListController', TermsCancelledListController);

    TermsCancelledListController.$inject = ['$state', 'termsService', 'NgTableParams'];

    function TermsCancelledListController($state, termsService, NgTableParams) {
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
                    vm.tableParams = new NgTableParams({}, {dataset: vm.cancelledTerms});
                    vm.loadingCancelled = false;
                }
            }

            function getTermsCancelledFailure() {
                $state.go('root.terms.cancelled_error');
            }
        }
    }
})();
