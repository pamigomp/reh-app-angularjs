(function () {
    'use strict';

    angular.module('rehApp.employees.list', ['rehApp.employeesService', 'ui.router'])

            .controller('EmployeesListController', EmployeesListController);

    EmployeesListController.$inject = ['$state', 'employeesService'];

    function EmployeesListController($state, employeesService) {
        var vm = this;

        vm.loadEmployeesList = function () {
            vm.loading = true;

            employeesService.getEmployeesList().then(function (employeesList) {
                if (employeesList.length === 0) {
                    vm.loading = false;
                    $state.go('root.employees.list_empty');
                } else {
                    vm.employees = employeesList;
                    vm.loading = false;
                }
            }, function () {
                vm.loading = false;
                $state.go('root.employees.list_error');
            });
        };

        vm.removeEmployee = function () {
            vm.removing = true;
            vm.errorRemove = false;

            employeesService.removeEmployee(vm.chosenEmployee.employeeid).then(function () {
                if (vm.employees.length - 1 === 0) {
                    $state.go('root.employees.list_empty');
                } else {
                    vm.loadEmployeesList();
                }
            }, function () {
                vm.removing = false;
                vm.errorRemove = true;
            });
        };

        vm.setChosen = function (employee) {
            vm.chosenEmployee = employee;
        };
    }
})();
