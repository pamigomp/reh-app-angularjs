(function () {
    'use strict';

    angular.module('rehApp.patients.terms', ['rehApp.patientsService', 'ui.router', 'ngTable'])

            .controller('PatientTermsController', PatientTermsController);

    PatientTermsController.$inject = ['$state', '$stateParams', '$q', 'patientsService', 'NgTableParams'];

    function PatientTermsController($state, $stateParams, $q, patientsService, NgTableParams) {
        var vm = this;

        vm.cancelTerm = cancelTerm;
        vm.completeTerm = completeTerm;
        vm.loadPatientTermsCancelled = loadPatientTermsCancelled;
        vm.loadPatientTermsCompleted = loadPatientTermsCompleted;
        vm.loadPatientTermsPending = loadPatientTermsPending;
        vm.setChosen = setChosen;
        vm.tableParamsCancelled = createTableParams('desc');
        vm.tableParamsCompleted = createTableParams('desc');
        vm.tableParamsPending = createTableParams('asc');
        vm.kindsOfVisit = [{'id': 'Prywatna', 'title': 'Prywatna'}, {'id': 'NFZ', 'title': 'NFZ'}];
        vm.kindsOfTreatment = $q.when(patientsService.getKindsOfTreatment());
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

        function loadPatientTermsPending() {
            vm.emptyPending = false;
            vm.errorLoading = false;
            vm.loadingPending = true;

            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.getPatientTermsPending($stateParams.patientPesel)
                        .then(getPatientTermsPendingSuccess, getPatientTermsPendingFailure);
            }

            function getPatientTermsPendingSuccess(pendingTerms) {
                if (pendingTerms.length === 0) {
                    vm.emptyPending = true;
                    vm.errorLoading = false;
                    vm.loadingPending = false;
                } else {
                    $state.get('root.patients.patient').data.breadcrumb = pendingTerms[0].patient_surname + ' ' + pendingTerms[0].patient_name;
                    vm.tableParamsPending.settings({dataset: pendingTerms});
                    vm.emptyPending = false;
                    vm.errorLoading = false;
                    vm.loadingPending = false;
                }
            }

            function getPatientTermsPendingFailure() {
                vm.emptyPending = false;
                vm.errorLoading = true;
                vm.loadingPending = false;
            }
        }

        function loadPatientTermsCancelled() {
            vm.emptyCancelled = false;
            vm.errorLoading = false;
            vm.loadingCancelled = true;

            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.getPatientTermsCancelled($stateParams.patientPesel)
                        .then(getPatientTermsCancelledSuccess, getPatientTermsCancelledFailure);
            }

            function getPatientTermsCancelledSuccess(cancelledTerms) {
                if (cancelledTerms.length === 0) {
                    vm.emptyCancelled = true;
                    vm.errorLoading = false;
                    vm.loadingCancelled = false;
                } else {
                    $state.get('root.patients.patient').data.breadcrumb = cancelledTerms[0].patient_surname + ' ' + cancelledTerms[0].patient_name;
                    vm.tableParamsCancelled.settings({dataset: cancelledTerms});
                    vm.emptyCancelled = false;
                    vm.errorLoading = false;
                    vm.loadingCancelled = false;
                }
            }

            function getPatientTermsCancelledFailure() {
                vm.emptyCancelled = false;
                vm.errorLoading = true;
                vm.loadingCancelled = false;
            }
        }

        function loadPatientTermsCompleted() {
            vm.emptyCompleted = false;
            vm.errorLoading = false;
            vm.loadingCompleted = true;

            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.getPatientTermsCompleted($stateParams.patientPesel)
                        .then(getPatientTermsCompletedSuccess, getPatientTermsCompletedFailure);
            }

            function getPatientTermsCompletedSuccess(completedTerms) {
                if (completedTerms.length === 0) {
                    vm.emptyCompleted = true;
                    vm.errorLoading = false;
                    vm.loadingCompleted = false;
                } else {
                    $state.get('root.patients.patient').data.breadcrumb = completedTerms[0].patient_surname + ' ' + completedTerms[0].patient_name;
                    vm.tableParamsCompleted.settings({dataset: completedTerms});
                    vm.emptyCompleted = false;
                    vm.errorLoading = false;
                    vm.loadingCompleted = false;
                }
            }

            function getPatientTermsCompletedFailure() {
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

            patientsService.cancelPatientTerm(patienttreatmentid)
                    .then(cancelPatientTermSuccess, cancelPatientTermFailure);

            function cancelPatientTermSuccess() {
                vm.loadPatientTermsPending();
                vm.loadPatientTermsCancelled();
                vm.cancelling = false;
                vm.errorCancel = false;
            }

            function cancelPatientTermFailure() {
                vm.cancelling = false;
                vm.errorCancel = true;
            }
        }

        function completeTerm(patienttreatmentid) {
            vm.completing = true;
            vm.errorComplete = false;

            patientsService.completePatientTerm(patienttreatmentid)
                    .then(completePatientTermSuccess, completePatientTermFailure);

            function completePatientTermSuccess() {
                vm.loadPatientTermsPending();
                vm.loadPatientTermsCompleted();
                vm.completing = false;
                vm.errorComplete = false;
            }

            function completePatientTermFailure() {
                vm.completing = false;
                vm.errorComplete = true;
            }
        }
    }
})();
