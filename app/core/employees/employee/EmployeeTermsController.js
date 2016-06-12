'use strict';

angular.module('rehApp')

        .controller('EmployeeTermsController', function ($scope, $state, $stateParams, EmployeesDataService) {

            $scope.loadEmployeeTermsPending = function () {
                $scope.loadingPending = true;
                $scope.errorLoading = false;
                if (angular.isDefined($stateParams.employeeId)) {
                    EmployeesDataService.getEmployeeTermsPending($stateParams.employeeId).then(
                            function (pendingTerms) {
                                if (pendingTerms.length === 0) {
                                    $scope.emptyPending = true;
                                }
                                else {
                                    $state.get('root.employees.employee').data.breadcrumb = pendingTerms[0].surname + ' ' + pendingTerms[0].name;
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

            $scope.loadEmployeeTermsCancelled = function () {
                $scope.loadingCancelled = true;
                $scope.errorLoading = false;
                if (angular.isDefined($stateParams.employeeId)) {
                    EmployeesDataService.getEmployeeTermsCancelled($stateParams.employeeId).then(
                            function (cancelledTerms) {
                                if (cancelledTerms.length === 0) {
                                    $scope.emptyCancelled = true;
                                }
                                else {
                                    $state.get('root.employees.employee').data.breadcrumb = cancelledTerms[0].surname + ' ' + cancelledTerms[0].name;
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

            $scope.loadEmployeeTermsCompleted = function () {
                $scope.loadingCompleted = true;
                $scope.errorLoading = false;
                if (angular.isDefined($stateParams.employeeId)) {
                    EmployeesDataService.getEmployeeTermsCompleted($stateParams.employeeId).then(
                            function (completedTerms) {
                                if (completedTerms.length === 0) {
                                    $scope.emptyCompleted = true;
                                }
                                else {
                                    $state.get('root.employees.employee').data.breadcrumb = completedTerms[0].surname + ' ' + completedTerms[0].name;
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
                EmployeesDataService.cancelEmployeeTerm(patienttreatmentid).then(function () {
                    $scope.loadEmployeeTermsPending();
                    $scope.loadEmployeeTermsCancelled();
                    $scope.cancelling = false;
                    $scope.errorCancel = false;
                }, function () {
                    $scope.cancelling = false;
                    $scope.errorCancel = true;
                });
            };
            
            $scope.completeTerm = function (patienttreatmentid) {
                $scope.completing = true;
                EmployeesDataService.completeEmployeeTerm(patienttreatmentid).then(function () {
                    $scope.loadEmployeeTermsPending();
                    $scope.loadEmployeeTermsCompleted();
                    $scope.completing = false;
                    $scope.errorComplete = false;
                }, function () {
                    $scope.completing = false;
                    $scope.errorComplete = true;
                });
            };
        });
