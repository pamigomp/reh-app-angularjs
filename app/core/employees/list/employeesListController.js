(function () {
    'use strict';

    angular.module('rehApp.employees.list', ['rehApp.employeesService', 'ui.router', 'ngTable'])

            .controller('EmployeesListController', EmployeesListController);

    EmployeesListController.$inject = ['$state', 'employeesService', 'NgTableParams'];

    function EmployeesListController($state, employeesService, NgTableParams) {
        var vm = this;

        vm.loadEmployeesList = loadEmployeesList;
        vm.removeEmployee = removeEmployee;
        vm.setChosen = setChosen;
        vm.statuses = [{'id': 'Aktywny', 'title': 'Aktywny'}, {'id': 'Nieaktywny', 'title': 'Nieaktywny'}];
        vm.tableParams = createTableParams();

        function createTableParams() {
            var initialParams = {
                count: 10,
                sorting: {surname: 'asc'}
            };
            var initialSettings = {
                counts: [10, 25, 50, 100],
                paginationMaxBlocks: 5,
                paginationMinBlocks: 1
            };
            return new NgTableParams(initialParams, initialSettings);
        }

        function loadEmployeesList() {
            vm.loading = true;

            employeesService.getEmployeesList()
                    .then(getEmployeesListSuccess, getEmployeesListFailure);

            function getEmployeesListSuccess(employeesList) {
                if (employeesList.length === 0) {
                    $state.go('root.employees.list_empty');
                } else {
                    vm.employees = employeesList;
                    vm.tableParams.settings({dataset: vm.employees});
                    vm.loading = false;
                }
            }

            function getEmployeesListFailure() {
                $state.go('root.employees.list_error');
            }
        }

        function removeEmployee(employeeid) {
            vm.removing = true;
            vm.errorRemove = false;

            employeesService.removeEmployee(employeeid)
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
