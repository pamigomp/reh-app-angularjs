(function () {
    'use strict';

    angular.module('rehApp.terms.pending.list', ['rehApp.termsService', 'ui.router'])

            .controller('TermsPendingListController', TermsPendingListController);

    TermsPendingListController.$inject = ['$state', 'termsService'];

    function TermsPendingListController($state, termsService) {
        var vm = this;

        vm.loadTermsPending = loadTermsPending;
        vm.setChosen = setChosen;
        vm.cancelTerm = cancelTerm;
        vm.completeTerm = completeTerm;

        function loadTermsPending() {
            vm.loadingPending = true;

            termsService.getTermsPending()
                    .then(getTermsPendingSuccess, getTermsPendingFailure);

            function getTermsPendingSuccess(pendingTerms) {
                if (pendingTerms.length === 0) {
                    $state.go('root.terms.pending_empty');
                } else {
                    vm.pendingTerms = pendingTerms;
                    vm.loadingPending = false;
                }
            }

            function getTermsPendingFailure() {
                $state.go('root.terms.pending_error');
            }
        }

        function setChosen(term) {
            vm.chosenTerm = term;
        }

        function cancelTerm(patienttreatmentid) {
            vm.cancelling = true;
            vm.errorCancel = false;

            termsService.cancelTerm(patienttreatmentid)
                    .then(cancelTermSuccess, cancelTermFailure);

            function cancelTermSuccess() {
                vm.loadTermsPending();
                vm.cancelling = false;
                vm.errorCancel = false;
            }

            function cancelTermFailure() {
                vm.cancelling = false;
                vm.errorCancel = true;
            }
        }

        function completeTerm(patienttreatmentid) {
            vm.completing = true;
            vm.errorComplete = false;

            termsService.completeTerm(patienttreatmentid)
                    .then(completeTermSuccess, completeTermFailure);

            function completeTermSuccess() {
                vm.loadTermsPending();
                vm.completing = false;
                vm.errorComplete = false;
            }

            function completeTermFailure() {
                vm.completing = false;
                vm.errorComplete = true;
            }
        }
    }
})();
