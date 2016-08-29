(function () {
    'use strict';

    angular.module('rehApp.employees.terms', ['rehApp.employeesService', 'ui.router'])

            .controller('EmployeeTermsController', EmployeeTermsController);

    EmployeeTermsController.$inject = ['$state', '$stateParams', 'employeesService'];

    function EmployeeTermsController($state, $stateParams, employeesService) {
        var vm = this;

        vm.loadEmployeeTermsPending = function () {
            vm.loadingPending = true;
            vm.errorLoading = false;
            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.getEmployeeTermsPending($stateParams.employeeId).then(
                        function (pendingTerms) {
                            if (pendingTerms.length === 0) {
                                vm.emptyPending = true;
                            } else {
                                $state.get('root.employees.employee').data.breadcrumb = pendingTerms[0].surname + ' ' + pendingTerms[0].name;
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

        vm.loadEmployeeTermsCancelled = function () {
            vm.loadingCancelled = true;
            vm.errorLoading = false;
            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.getEmployeeTermsCancelled($stateParams.employeeId).then(
                        function (cancelledTerms) {
                            if (cancelledTerms.length === 0) {
                                vm.emptyCancelled = true;
                            } else {
                                $state.get('root.employees.employee').data.breadcrumb = cancelledTerms[0].surname + ' ' + cancelledTerms[0].name;
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

        vm.loadEmployeeTermsCompleted = function () {
            vm.loadingCompleted = true;
            vm.errorLoading = false;
            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.getEmployeeTermsCompleted($stateParams.employeeId).then(
                        function (completedTerms) {
                            if (completedTerms.length === 0) {
                                vm.emptyCompleted = true;
                            } else {
                                $state.get('root.employees.employee').data.breadcrumb = completedTerms[0].surname + ' ' + completedTerms[0].name;
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
            employeesService.cancelEmployeeTerm(patienttreatmentid).then(function () {
                vm.loadEmployeeTermsPending();
                vm.loadEmployeeTermsCancelled();
                vm.cancelling = false;
                vm.errorCancel = false;
            }, function () {
                vm.cancelling = false;
                vm.errorCancel = true;
            });
        };

        vm.completeTerm = function (patienttreatmentid) {
            vm.completing = true;
            employeesService.completeEmployeeTerm(patienttreatmentid).then(function () {
                vm.loadEmployeeTermsPending();
                vm.loadEmployeeTermsCompleted();
                vm.completing = false;
                vm.errorComplete = false;
            }, function () {
                vm.completing = false;
                vm.errorComplete = true;
            });
        };
    }
})();
