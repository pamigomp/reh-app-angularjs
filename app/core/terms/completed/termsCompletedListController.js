(function () {
    'use strict';

    angular.module('rehApp.terms.completed.list', ['rehApp.termsService', 'ui.router'])

            .controller('TermsCompletedListController', TermsCompletedListController);

    TermsCompletedListController.$inject = ['$state', 'termsService'];

    function TermsCompletedListController($state, termsService) {
        var vm = this;

        vm.loadTermsCompleted = loadTermsCompleted;

        function loadTermsCompleted() {
            vm.loadingCompleted = true;

            termsService.getTermsCompleted()
                    .then(getTermsCompletedSuccess, getTermsCompletedFailure);

            function getTermsCompletedSuccess(completedTerms) {
                if (completedTerms.length === 0) {
                    $state.go('root.terms.completed_empty');
                } else {
                    vm.completedTerms = completedTerms;
                    vm.loadingCompleted = false;
                }
            }

            function getTermsCompletedFailure() {
                $state.go('root.terms.completed_error');
            }
        }
    }
})();
