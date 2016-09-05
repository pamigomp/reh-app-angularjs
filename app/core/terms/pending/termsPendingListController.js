(function () {
    'use strict';

    angular.module('rehApp.terms.pending.list', ['rehApp.termsService', 'ui.router', 'ngTable'])

            .controller('TermsPendingListController', TermsPendingListController);

    TermsPendingListController.$inject = ['$state', 'termsService', 'NgTableParams'];

    function TermsPendingListController($state, termsService, NgTableParams) {
        var vm = this;

        vm.loadTermsPending = loadTermsPending;
        vm.setChosen = setChosen;
        vm.cancelTerm = cancelTerm;
        vm.completeTerm = completeTerm;
        vm.tableParams = createTableParams();

        function createTableParams() {
            var initialParams = {
                count: 10,
                sorting: {datehour: 'asc'}
            };
            var initialSettings = {
                filterOptions: {filterLayout: 'horizontal'},
                counts: [10, 25, 50, 100],
                paginationMaxBlocks: 5,
                paginationMinBlocks: 1
            };
            return new NgTableParams(initialParams, initialSettings);
        }

        vm.employeeFilters = {
            surname: {
                id: 'text',
                placeholder: 'Nazwisko'
            },
            name: {
                id: 'text',
                placeholder: 'Imię'
            }
        };

        vm.patientFilters = {
            patient_surname: {
                id: 'text',
                placeholder: 'Nazwisko'
            },
            patient_name: {
                id: 'text',
                placeholder: 'Imię'
            }
        };

        function loadTermsPending() {
            vm.loadingPending = true;

            termsService.getTermsPending()
                    .then(getTermsPendingSuccess, getTermsPendingFailure);

            function getTermsPendingSuccess(pendingTerms) {
                if (pendingTerms.length === 0) {
                    $state.go('root.terms.pending_empty');
                } else {
                    vm.tableParams.settings({dataset: pendingTerms});
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
