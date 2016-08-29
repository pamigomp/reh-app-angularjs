(function () {
    'use strict';

    angular.module('rehApp.patients.terms', ['rehApp.patientsService', 'ui.router'])

            .controller('PatientTermsController', PatientTermsController);

    PatientTermsController.$inject = ['$state', '$stateParams', 'patientsService'];

    function PatientTermsController($state, $stateParams, patientsService) {
        var vm = this;

        vm.loadPatientTermsPending = function () {
            vm.loadingPending = true;
            vm.errorLoading = false;
            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.getPatientTermsPending($stateParams.patientPesel).then(
                        function (pendingTerms) {
                            if (pendingTerms.length === 0) {
                                vm.emptyPending = true;
                            } else {
                                $state.get('root.patients.patient').data.breadcrumb = pendingTerms[0].patient_surname + ' ' + pendingTerms[0].patient_name;
                                console.log(pendingTerms[0]);
                                vm.pendingTerms = pendingTerms;
                                vm.loadingPending = false;
                                vm.errorLoading = false;
                                vm.emptyPending = false;
                            }
                        },
                        function () {
                            vm.loadingPending = false;
                            vm.errorLoading = true;
                            vm.emptyPending = false;
                        }
                );
            }
        };

        vm.loadPatientTermsCancelled = function () {
            vm.loadingCancelled = true;
            vm.errorLoading = false;
            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.getPatientTermsCancelled($stateParams.patientPesel).then(
                        function (cancelledTerms) {
                            if (cancelledTerms.length === 0) {
                                vm.emptyCancelled = true;
                            } else {
                                $state.get('root.patients.patient').data.breadcrumb = cancelledTerms[0].patient_surname + ' ' + cancelledTerms[0].patient_name;
                                vm.cancelledTerms = cancelledTerms;
                                vm.loadingCancelled = false;
                                vm.errorLoading = false;
                                vm.emptyCancelled = false;
                            }
                        },
                        function () {
                            vm.loadingCancelled = false;
                            vm.errorLoading = true;
                            vm.emptyCancelled = false;
                        }
                );
            }
        };

        vm.loadPatientTermsCompleted = function () {
            vm.loadingCompleted = true;
            vm.errorLoading = false;
            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.getPatientTermsCompleted($stateParams.patientPesel).then(
                        function (completedTerms) {
                            if (completedTerms.length === 0) {
                                vm.emptyCompleted = true;
                            } else {
                                $state.get('root.patients.patient').data.breadcrumb = completedTerms[0].patient_surname + ' ' + completedTerms[0].patient_name;
                                vm.completedTerms = completedTerms;
                                vm.loadingCompleted = false;
                                vm.errorLoading = false;
                                vm.emptyCompleted = false;
                            }
                        },
                        function () {
                            vm.loadingCompleted = false;
                            vm.errorLoading = true;
                            vm.emptyCompleted = false;
                        }
                );
            }
        };

        vm.setChosen = function (term) {
            vm.chosenTerm = term;
        };

        vm.cancelTerm = function (patienttreatmentid) {
            vm.cancelling = true;
            patientsService.cancelPatientTerm(patienttreatmentid).then(function () {
                vm.loadPatientTermsPending();
                vm.loadPatientTermsCancelled();
                vm.cancelling = false;
                vm.errorCancel = false;
            }, function () {
                vm.cancelling = false;
                vm.errorCancel = true;
            });
        };

        vm.completeTerm = function (patienttreatmentid) {
            vm.completing = true;
            patientsService.completePatientTerm(patienttreatmentid).then(function () {
                vm.loadPatientTermsPending();
                vm.loadPatientTermsCompleted();
                vm.completing = false;
                vm.errorComplete = false;
            }, function () {
                vm.completing = false;
                vm.errorComplete = true;
            });
        };
    }
})();
