(function () {
    'use strict';

    angular.module('rehApp.terms.cancelled.list', ['rehApp.termsService', 'ui.router'])

            .controller('TermsCancelledListController', TermsCancelledListController);

    TermsCancelledListController.$inject = ['$state', 'termsService'];

    function TermsCancelledListController($state, termsService) {
        var vm = this;

        vm.loadTermsCancelled = function () {
            vm.loadingCancelled = true;
            termsService.getTermsCancelled().then(
                    function (cancelledTerms) {
                        if (cancelledTerms.length === 0) {
                            vm.loadingCancelled = false;
                            $state.go('root.terms.cancelled_empty');
                        } else {
                            vm.cancelledTerms = cancelledTerms;
                            vm.loadingCancelled = false;
                        }
                    },
                    function () {
                        vm.loadingCancelled = false;
                        $state.go('root.terms.cancelled_error');
                    }
            );
        };
    }
})();
