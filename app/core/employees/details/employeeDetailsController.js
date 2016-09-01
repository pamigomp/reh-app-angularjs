(function () {
    'use strict';

    angular.module('rehApp.employees.details', ['rehApp.employeesService', 'ui.router'])

            .controller('EmployeeDetailsController', EmployeeDetailsController);

    EmployeeDetailsController.$inject = ['$state', '$stateParams', 'employeesService'];

    function EmployeeDetailsController($state, $stateParams, employeesService) {
        var vm = this;
        var restoreEmployeeDetails = restoreEmployeeDetails;
        var saveDefaultEmployeeDetails = saveDefaultEmployeeDetails;

        vm.allowEdit = false;
        vm.cancelEdit = cancelEdit;
        vm.dateOptions = {
            startingDay: 1,
            maxDate: new Date()
        };
        vm.defaultEmployeeDetails = {};
        vm.employeeDetails = {};
        vm.errorEdit = false;
        vm.errorLoading = false;
        vm.loadEmployeeDetails = loadEmployeeDetails;
        vm.loading = false;
        vm.open = open;
        vm.opened = false;
        vm.saveEdit = saveEdit;
        vm.startEdit = startEdit;
        vm.updating = false;
        vm.updateEmployeeDetails = updateEmployeeDetails;

        //After clicking 'Anuluj' button, we would not be able to make changes in the fields
        //and all changes are being discarded (loading previous employee's details).
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

        //After clicking 'Zapisz' button, we would not be able to make changes in the fields
        //and all changes are being saved.
        function saveEdit() {
            vm.updateEmployeeDetails();
        }

        //After clicking 'Edytuj' button, we would be able to make changes in the fields.
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
