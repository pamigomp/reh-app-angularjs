(function () {
    'use strict';

    angular.module('rehApp.employees.create', ['rehApp.employeesService'])

            .controller('EmployeeCreateController', EmployeeCreateController);

    EmployeeCreateController.$inject = ['employeesService'];

    function EmployeeCreateController(employeesService) {
        var vm = this;

        vm.employeeDetails = {};
        vm.errorCreate = false;
        vm.employeeDetails.country = 'Polska';

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

        vm.saveEmployeeDetails = function () {
            vm.submitting = true;
            employeesService.saveEmployeeDetails(vm.employeeDetails).then(
                    function () {
                        vm.errorCreate = false;
                        vm.submitting = false;
                    }, function () {
                vm.errorCreate = true;
                vm.submitting = false;
            });
        };

        vm.maxDate = new Date();
        vm.valuationDatePickerIsOpen = false;
        vm.valuationDatePickerIsOpen2 = false;

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

        vm.valuationDatePickerOpen2 = function ($event) {
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            }

            vm.valuationDatePickerIsOpen2 = true;
        };
    }
})();
