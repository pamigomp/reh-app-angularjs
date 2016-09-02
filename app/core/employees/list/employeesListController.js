(function () {
    'use strict';

    angular.module('rehApp.employees.list', ['rehApp.employeesService', 'ui.router'])

            .controller('EmployeesListController', EmployeesListController);

    EmployeesListController.$inject = ['$state', 'employeesService'];

    function EmployeesListController($state, employeesService) {
        var vm = this;

        vm.loadEmployeesList = loadEmployeesList;
        vm.removeEmployee = removeEmployee;
        vm.setChosen = setChosen;

        function loadEmployeesList() {
            vm.loading = true;

            employeesService.getEmployeesList()
                    .then(getEmployeesListSuccess, getEmployeesListFailure);

            function getEmployeesListSuccess(employeesList) {
                if (employeesList.length === 0) {
                    $state.go('root.employees.list_empty');
                } else {
                    vm.employees = employeesList;
                    vm.loading = false;
                }
            }

            function getEmployeesListFailure() {
                $state.go('root.employees.list_error');
            }
        }

        function removeEmployee() {
            vm.removing = true;
            vm.errorRemove = false;

            employeesService.removeEmployee(vm.chosenEmployee.employeeid)
                    .then(removeEmployeeSuccess, removeEmployeeFailure);

            function removeEmployeeSuccess() {
                if (vm.employees.length - 1 === 0) {
                    $state.go('root.employees.list_empty');
                } else {
                    vm.removing = false;
                    vm.errorRemove = false;
                    vm.loadEmployeesList();
                }
            }

            function removeEmployeeFailure() {
                vm.removing = false;
                vm.errorRemove = true;
            }
        }

        function setChosen(employee) {
            vm.chosenEmployee = employee;
        }
    }
})();
