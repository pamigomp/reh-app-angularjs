(function () {
    'use strict';

    angular.module('rehApp.employees.create', ['rehApp.employeesService', 'ui.bootstrap'])

            .controller('EmployeeCreateController', EmployeeCreateController);

    EmployeeCreateController.$inject = ['employeesService'];

    function EmployeeCreateController(employeesService) {
        var vm = this;

        vm.dateOptions = {
            startingDay: 1,
            maxDate: new Date()
        };
        vm.employeeDetails = {};
        vm.employeeDetails.country = 'Polska';
        vm.open = open;
        vm.open2 = open2;
        vm.saveEmployeeDetails = saveEmployeeDetails;

        function open() {
            vm.opened = true;
        }

        function open2() {
            vm.opened2 = true;
        }

        function saveEmployeeDetails() {
            vm.errorCreate = false;
            vm.submitting = true;
            employeesService.saveEmployeeDetails(vm.employeeDetails)
                    .then(saveEmployeeDetailsSuccess, saveEmployeeDetailsFailure);

            function saveEmployeeDetailsSuccess() {
                vm.errorCreate = false;
                vm.submitting = false;
            }

            function saveEmployeeDetailsFailure() {
                vm.errorCreate = true;
                vm.submitting = false;
            }
        }
    }
})();
