'use strict';

angular.module('RehApp')

        .controller('PatientTermsController', function ($scope, $state, $stateParams, PatientsDataService) {

            $scope.loadPatientTermsPending = function () {
                $scope.loadingPending = true;
                $scope.errorLoading = false;
                if (angular.isDefined($stateParams.patientPesel)) {
                    PatientsDataService.getPatientTermsPending($stateParams.patientPesel).then(
                            function (pendingTerms) {
                                if (pendingTerms.length === 0) {
                                    $scope.emptyPending = true;
                                }
                                else {
                                    $state.get('root.patients.patient').data.breadcrumb = pendingTerms[0].patient_surname + ' ' + pendingTerms[0].patient_name;
                                    $scope.pendingTerms = pendingTerms;
                                    $scope.loadingPending = false;
                                    $scope.errorLoading = false;
                                    $scope.emptyPending = false;
                                }
                            },
                            function () {
                                $scope.loadingPending = false;
                                $scope.errorLoading = true;
                                $scope.emptyPending = false;
                            }
                    );
                }
            };

            $scope.loadPatientTermsCancelled = function () {
                $scope.loadingCancelled = true;
                $scope.errorLoading = false;
                if (angular.isDefined($stateParams.patientPesel)) {
                    PatientsDataService.getPatientTermsCancelled($stateParams.patientPesel).then(
                            function (cancelledTerms) {
                                if (cancelledTerms.length === 0) {
                                    $scope.emptyCancelled = true;
                                }
                                else {
                                    $state.get('root.patients.patient').data.breadcrumb = cancelledTerms[0].patient_surname + ' ' + cancelledTerms[0].patient_name;
                                    $scope.cancelledTerms = cancelledTerms;
                                    $scope.loadingCancelled = false;
                                    $scope.errorLoading = false;
                                    $scope.emptyCancelled = false;
                                }
                            },
                            function () {
                                $scope.loadingCancelled = false;
                                $scope.errorLoading = true;
                                $scope.emptyCancelled = false;
                            }
                    );
                }
            };

            $scope.loadPatientTermsCompleted = function () {
                $scope.loadingCompleted = true;
                $scope.errorLoading = false;
                if (angular.isDefined($stateParams.patientPesel)) {
                    PatientsDataService.getPatientTermsCompleted($stateParams.patientPesel).then(
                            function (completedTerms) {
                                if (completedTerms.length === 0) {
                                    $scope.emptyCompleted = true;
                                }
                                else {
                                    $state.get('root.patients.patient').data.breadcrumb = completedTerms[0].patient_surname + ' ' + completedTerms[0].patient_name;
                                    $scope.completedTerms = completedTerms;
                                    $scope.loadingCompleted = false;
                                    $scope.errorLoading = false;
                                    $scope.emptyCompleted = false;
                                }
                            },
                            function () {
                                $scope.loadingCompleted = false;
                                $scope.errorLoading = true;
                                $scope.emptyCompleted = false;
                            }
                    );
                }
            };

            $scope.setChosen = function (term) {
                $scope.chosenTerm = term;
            };
            
            $scope.cancelTerm = function (patienttreatmentid) {
                $scope.cancelling = true;
                PatientsDataService.cancelPatientTerm(patienttreatmentid).then(function () {
                    $scope.loadPatientTermsPending();
                    $scope.loadPatientTermsCancelled();
                    $scope.cancelling = false;
                    $scope.errorCancel = false;
                }, function () {
                    $scope.cancelling = false;
                    $scope.errorCancel = true;
                });
            };
        });
