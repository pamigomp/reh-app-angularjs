(function () {
    'use strict';

    angular.module('rehApp.terms.completed.list', ['rehApp.termsService', 'ui.router', 'ngTable'])

            .controller('TermsCompletedListController', TermsCompletedListController);

    TermsCompletedListController.$inject = ['$state', '$q', 'termsService', 'NgTableParams'];

    function TermsCompletedListController($state, $q, termsService, NgTableParams) {
        var vm = this;

        vm.loadTermsCompleted = loadTermsCompleted;
        vm.tableParams = createTableParams();
        vm.kindsOfVisit = [{'id': 'Prywatna', 'title': 'Prywatna'}, {'id': 'NFZ', 'title': 'NFZ'}];
        vm.kindsOfTreatment = $q.when(termsService.getKindsOfTreatment());

        function createTableParams() {
            var initialParams = {
                count: 10,
                sorting: {datehour: 'desc'}
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

        function loadTermsCompleted() {
            vm.loadingCompleted = true;

            termsService.getTermsCompleted()
                    .then(getTermsCompletedSuccess, getTermsCompletedFailure);

            function getTermsCompletedSuccess(completedTerms) {
                if (completedTerms.length === 0) {
                    $state.go('root.terms.completed_empty');
                } else {
                    vm.tableParams.settings({dataset: completedTerms});
                    vm.loadingCompleted = false;
                }
            }

            function getTermsCompletedFailure() {
                $state.go('root.terms.completed_error');
            }
        }
    }
})();
