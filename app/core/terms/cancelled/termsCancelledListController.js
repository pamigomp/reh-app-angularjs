(function () {
    'use strict';

    angular.module('rehApp.terms.cancelled.list', ['rehApp.termsService', 'ui.router', 'ngTable'])

            .controller('TermsCancelledListController', TermsCancelledListController);

    TermsCancelledListController.$inject = ['$state', '$q', 'termsService', 'NgTableParams'];

    function TermsCancelledListController($state, $q, termsService, NgTableParams) {
        var vm = this;

        vm.loadTermsCancelled = loadTermsCancelled;
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

        function loadTermsCancelled() {
            vm.loadingCancelled = true;

            termsService.getTermsCancelled()
                    .then(getTermsCancelledSuccess, getTermsCancelledFailure);

            function getTermsCancelledSuccess(cancelledTerms) {
                if (cancelledTerms.length === 0) {
                    $state.go('root.terms.cancelled_empty');
                } else {
                    vm.tableParams.settings({dataset: cancelledTerms});
                    vm.loadingCancelled = false;
                }
            }

            function getTermsCancelledFailure() {
                $state.go('root.terms.cancelled_error');
            }
        }
    }
})();
