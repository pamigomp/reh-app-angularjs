(function () {
    'use strict';

    angular.module('rehApp.terms.completed.list', ['rehApp.termsService', 'ui.router'])

            .controller('TermsCompletedListController', TermsCompletedListController);

    TermsCompletedListController.$inject = ['$state', 'termsService'];

    function TermsCompletedListController($state, termsService) {
        var vm = this;

        vm.loadTermsCompleted = function () {
            vm.loadingCompleted = true;
            termsService.getTermsCompleted().then(
                    function (completedTerms) {
                        if (completedTerms.length === 0) {
                            vm.loadingCompleted = false;
                            $state.go('root.terms.completed_empty');
                        } else {
                            vm.completedTerms = completedTerms;
                            vm.loadingCompleted = false;
                        }
                    },
                    function () {
                        vm.loadingCompleted = false;
                        $state.go('root.terms.completed_error');
                    }
            );
        };
    }
})();
