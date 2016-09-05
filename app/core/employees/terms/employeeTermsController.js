(function () {
    'use strict';

    angular.module('rehApp.employees.terms', ['rehApp.employeesService', 'ui.router', 'ngTable'])

            .controller('EmployeeTermsController', EmployeeTermsController);

    EmployeeTermsController.$inject = ['$state', '$stateParams', '$q', 'employeesService', 'NgTableParams'];

    function EmployeeTermsController($state, $stateParams, $q, employeesService, NgTableParams) {
        var vm = this;

        vm.cancelTerm = cancelTerm;
        vm.completeTerm = completeTerm;
        vm.loadEmployeeTermsCancelled = loadEmployeeTermsCancelled;
        vm.loadEmployeeTermsCompleted = loadEmployeeTermsCompleted;
        vm.loadEmployeeTermsPending = loadEmployeeTermsPending;
        vm.setChosen = setChosen;
        vm.tableParamsCancelled = createTableParams('desc');
        vm.tableParamsCompleted = createTableParams('desc');
        vm.tableParamsPending = createTableParams('asc');
        vm.kindsOfVisit = [{'id': 'Prywatna', 'title': 'Prywatna'}, {'id': 'NFZ', 'title': 'NFZ'}];
        vm.kindsOfTreatment = $q.when(employeesService.getKindsOfTreatment());
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

        function createTableParams(order) {
            var initialParams = {
                count: 10,
                sorting: {datehour: order}
            };
            var initialSettings = {
                filterOptions: {filterLayout: 'horizontal'},
                counts: [10, 25, 50, 100],
                paginationMaxBlocks: 5,
                paginationMinBlocks: 1
            };
            return new NgTableParams(initialParams, initialSettings);
        }

        function loadEmployeeTermsPending() {
            vm.emptyPending = false;
            vm.errorLoading = false;
            vm.loadingPending = true;

            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.getEmployeeTermsPending($stateParams.employeeId)
                        .then(getEmployeeTermsPendingSuccess, getEmployeeTermsPendingFailure);
            }

            function getEmployeeTermsPendingSuccess(pendingTerms) {
                if (pendingTerms.length === 0) {
                    vm.emptyPending = true;
                    vm.errorLoading = false;
                    vm.loadingPending = false;
                } else {
                    $state.get('root.employees.employee').data.breadcrumb = pendingTerms[0].surname + ' ' + pendingTerms[0].name;
                    vm.tableParamsPending.settings({dataset: pendingTerms});
                    vm.emptyPending = false;
                    vm.errorLoading = false;
                    vm.loadingPending = false;
                }
            }

            function getEmployeeTermsPendingFailure() {
                vm.emptyPending = false;
                vm.errorLoading = true;
                vm.loadingPending = false;
            }
        }

        function loadEmployeeTermsCancelled() {
            vm.emptyCancelled = false;
            vm.errorLoading = false;
            vm.loadingCancelled = true;

            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.getEmployeeTermsCancelled($stateParams.employeeId)
                        .then(getEmployeeTermsCancelledSuccess, getEmployeeTermsCancelledFailure);
            }

            function getEmployeeTermsCancelledSuccess(cancelledTerms) {
                if (cancelledTerms.length === 0) {
                    vm.emptyCancelled = true;
                    vm.errorLoading = false;
                    vm.loadingCancelled = false;
                } else {
                    $state.get('root.employees.employee').data.breadcrumb = cancelledTerms[0].surname + ' ' + cancelledTerms[0].name;
                    vm.tableParamsCancelled.settings({dataset: cancelledTerms});
                    vm.emptyCancelled = false;
                    vm.errorLoading = false;
                    vm.loadingCancelled = false;
                }
            }

            function getEmployeeTermsCancelledFailure() {
                vm.emptyCancelled = false;
                vm.errorLoading = true;
                vm.loadingCancelled = false;
            }
        }

        function loadEmployeeTermsCompleted() {
            vm.emptyCompleted = false;
            vm.errorLoading = false;
            vm.loadingCompleted = true;

            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.getEmployeeTermsCompleted($stateParams.employeeId)
                        .then(getEmployeeTermsCompletedSuccess, getEmployeeTermsCompletedFailure);
            }

            function getEmployeeTermsCompletedSuccess(completedTerms) {
                if (completedTerms.length === 0) {
                    vm.emptyCompleted = true;
                    vm.errorLoading = false;
                    vm.loadingCompleted = false;
                } else {
                    $state.get('root.employees.employee').data.breadcrumb = completedTerms[0].surname + ' ' + completedTerms[0].name;
                    vm.tableParamsCompleted.settings({dataset: completedTerms});
                    vm.emptyCompleted = false;
                    vm.errorLoading = false;
                    vm.loadingCompleted = false;
                }
            }

            function getEmployeeTermsCompletedFailure() {
                vm.emptyCompleted = false;
                vm.errorLoading = true;
                vm.loadingCompleted = false;
            }
        }

        function setChosen(term) {
            vm.chosenTerm = term;
        }

        function cancelTerm(patienttreatmentid) {
            vm.cancelling = true;
            vm.errorCancel = false;

            employeesService.cancelEmployeeTerm(patienttreatmentid)
                    .then(cancelEmployeeTermSuccess, cancelEmployeeTermFailure);

            function cancelEmployeeTermSuccess() {
                vm.loadEmployeeTermsPending();
                vm.loadEmployeeTermsCancelled();
                vm.cancelling = false;
                vm.errorCancel = false;
            }

            function cancelEmployeeTermFailure() {
                vm.cancelling = false;
                vm.errorCancel = true;
            }
        }

        function completeTerm(patienttreatmentid) {
            vm.completing = true;
            vm.errorComplete = false;

            employeesService.completeEmployeeTerm(patienttreatmentid)
                    .then(completeEmployeeTermSuccess, completeEmployeeTermFailure);

            function completeEmployeeTermSuccess() {
                vm.loadEmployeeTermsPending();
                vm.loadEmployeeTermsCompleted();
                vm.completing = false;
                vm.errorComplete = false;
            }

            function completeEmployeeTermFailure() {
                vm.completing = false;
                vm.errorComplete = true;
            }
        }
    }
})();
