(function () {
    'use strict';

    angular.module('rehApp.patients.terms', ['rehApp.patientsService', 'ui.router'])

            .controller('PatientTermsController', PatientTermsController);

    PatientTermsController.$inject = ['$state', '$stateParams', 'patientsService'];

    function PatientTermsController($state, $stateParams, patientsService) {
        var vm = this;

        vm.cancelledTerms = [];
        vm.cancelling = false;
        vm.cancelTerm = cancelTerm;
        vm.chosenTerm = '';
        vm.completedTerms = [];
        vm.completeTerm = completeTerm;
        vm.completing = false;
        vm.emptyCancelled = false;
        vm.emptyPending = false;
        vm.errorCancel = false;
        vm.errorComplete = false;
        vm.errorLoading = false;
        vm.loadPatientTermsCancelled = loadPatientTermsCancelled;
        vm.loadPatientTermsCompleted = loadPatientTermsCompleted;
        vm.loadPatientTermsPending = loadPatientTermsPending;
        vm.loadingPending = false;
        vm.pendingTerms = [];
        vm.setChosen = setChosen;

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
                    vm.pendingTerms = pendingTerms;
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
                    vm.cancelledTerms = cancelledTerms;
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
                    vm.completedTerms = completedTerms;
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
