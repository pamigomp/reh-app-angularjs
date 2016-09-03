(function () {
    'use strict';

    angular.module('rehApp.employees.details', ['rehApp.employeesService', 'ui.router'])

            .controller('EmployeeDetailsController', EmployeeDetailsController);

    EmployeeDetailsController.$inject = ['$state', '$stateParams', 'employeesService'];

    function EmployeeDetailsController($state, $stateParams, employeesService) {
        var vm = this;

        vm.allowEdit = false;
        vm.cancelEdit = cancelEdit;
        vm.dateOptions = {
            startingDay: 1,
            maxDate: new Date()
        };
        vm.defaultEmployeeDetails = {};
        vm.employeeDetails = {};
        vm.loadEmployeeDetails = loadEmployeeDetails;
        vm.open = open;
        vm.startEdit = startEdit;
        vm.updateEmployeeDetails = updateEmployeeDetails;

        function cancelEdit() {
            vm.allowEdit = false;
            restoreEmployeeDetails();
        }

        function loadEmployeeDetails() {
            vm.errorLoading = false;
            vm.loading = true;

            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.getEmployeeDetails($stateParams.employeeId)
                        .then(getEmployeeDetailsSuccess, getEmployeeDetailsFailure);
            }

            function getEmployeeDetailsSuccess(employeeDetails) {
                $state.get('root.employees.employee').data.breadcrumb = employeeDetails[0].surname + ' ' + employeeDetails[0].name;
                vm.employeeDetails = employeeDetails[0];
                vm.employeeDetails.dob = new Date(vm.employeeDetails.dob);
                saveDefaultEmployeeDetails();
                vm.errorLoading = false;
                vm.loading = false;
            }

            function getEmployeeDetailsFailure() {
                vm.errorLoading = true;
                vm.loading = false;
            }
        }

        function open() {
            vm.opened = true;
        }

        function restoreEmployeeDetails() {
            angular.copy(vm.defaultEmployeeDetails, vm.employeeDetails);
        }

        function saveDefaultEmployeeDetails() {
            angular.copy(vm.employeeDetails, vm.defaultEmployeeDetails);
        }

        function startEdit() {
            vm.allowEdit = true;
        }

        function updateEmployeeDetails() {
            vm.errorEdit = false;
            vm.updating = true;

            if (angular.isDefined($stateParams.employeeId)) {
                employeesService.updateEmployeeDetails(vm.employeeDetails)
                        .then(updateEmployeeDetailsSuccess, updateEmployeeDetailsFailure);
            }

            function updateEmployeeDetailsSuccess() {
                saveDefaultEmployeeDetails();
                vm.allowEdit = false;
                vm.errorEdit = false;
                vm.updating = false;
            }

            function updateEmployeeDetailsFailure() {
                vm.errorEdit = true;
                vm.updating = false;
            }
        }
    }
})();
