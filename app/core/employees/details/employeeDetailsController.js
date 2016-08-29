(function () {
    'use strict';

    angular.module('rehApp.employees.details', ['rehApp.employeesService', 'ui.router'])

            .controller('EmployeeDetailsController', EmployeeDetailsController);

    EmployeeDetailsController.$inject = ['$state', '$stateParams', 'employeesService'];

    function EmployeeDetailsController($state, $stateParams, employeesService) {
        var vm = this;

        vm.allowEdit = false;
        vm.defaultEmployeeDetails = {};

        vm.rangeDays = function () {
            var input = [];
            for (var i = 1; i <= 31; i++) {
                input.push(i);
            }
            return input;
        };

        vm.rangeYears = function (max, min) {
            var input = [];
            for (var i = max; i >= min; i -= 1) {
                input.push(i);
            }
            return input;
        };

        vm.loadEmployeeDetails = function () {
            vm.loading = true;
            vm.errorLoading = false;
            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.getEmployeeDetails($stateParams.employeeId).then(
                        function (employeeDetails) {
                            $state.get('root.employees.employee').data.breadcrumb = employeeDetails[0].surname + ' ' + employeeDetails[0].name;
                            vm.employeeDetails = employeeDetails[0];
                            vm.saveDefaultEmployeeDetails();
                            vm.loading = false;
                            vm.errorLoading = false;
                        },
                        function () {
                            vm.loading = false;
                            vm.errorLoading = true;
                        }
                );
            }
        };

        vm.updateEmployeeDetails = function () {
            vm.updating = true;
            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.updateEmployeeDetails(vm.employeeDetails).then(function () {
                    vm.updating = false;
                    vm.errorEdit = false;
                }, function () {
                    vm.updating = false;
                    vm.errorEdit = true;
                });
            }
        };

        vm.restoreEmployeeDetails = function () {
            angular.copy(vm.defaultEmployeeDetails, vm.employeeDetails);
        };

        vm.saveDefaultEmployeeDetails = function () {
            angular.copy(vm.employeeDetails, vm.defaultEmployeeDetails);
        };

        //After clicking 'Edytuj' button, we would be able to make changes in the fields.
        vm.startEdit = function () {
            vm.allowEdit = true;
        };

        //After clicking 'Zapisz' button, we would not be able to make changes in the fields
        //and all changes are being saved.
        vm.saveEdit = function () {
            vm.allowEdit = false;
            vm.updateEmployeeDetails();
        };

        //After clicking 'Anuluj' button, we would not be able to make changes in the fields
        //and all changes are being discarded (loading previous employee's details).
        vm.cancelEdit = function () {
            vm.allowEdit = false;
            vm.restoreEmployeeDetails();
        };

        vm.maxDate = new Date();
        vm.valuationDatePickerIsOpen = false;

        vm.dateOptions = {
            'starting-day': 1
        };

        vm.valuationDatePickerOpen = function ($event) {
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            }

            vm.valuationDatePickerIsOpen = true;
        };
    }
})();
