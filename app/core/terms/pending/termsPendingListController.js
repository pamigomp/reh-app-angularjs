(function () {
    'use strict';

    angular.module('rehApp.terms.pending.list', ['rehApp.termsService', 'ui.router'])

            .controller('TermsPendingListController', TermsPendingListController);

    TermsPendingListController.$inject = ['$state', 'termsService'];

    function TermsPendingListController($state, termsService) {
        var vm = this;

        vm.loadTermsPending = function () {
            vm.loadingPending = true;
            termsService.getTermsPending().then(
                    function (pendingTerms) {
                        if (pendingTerms.length === 0) {
                            vm.loadingPending = false;
                            $state.go('root.terms.pending_empty');
                        } else {
                            vm.pendingTerms = pendingTerms;
                            vm.loadingPending = false;
                        }
                    },
                    function () {
                        vm.loadingPending = false;
                        $state.go('root.terms.pending_error');
                    }
            );
        };

        vm.setChosen = function (term) {
            vm.chosenTerm = term;
        };

        vm.cancelTerm = function (patienttreatmentid) {
            vm.cancelling = true;
            termsService.cancelTerm(patienttreatmentid).then(function () {
                vm.loadTermsPending();
                vm.cancelling = false;
                vm.errorCancel = false;
            }, function () {
                vm.cancelling = false;
                vm.errorCancel = true;
            });
        };

        vm.completeTerm = function (patienttreatmentid) {
            vm.completing = true;
            termsService.completeTerm(patienttreatmentid).then(function () {
                vm.loadTermsPending();
                vm.completing = false;
                vm.errorComplete = false;
            }, function () {
                vm.completing = false;
                vm.errorComplete = true;
            });
        };
    }
})();
