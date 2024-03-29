(function () {
    'use strict';

    angular.module('rehApp.patients.details', ['rehApp.patientsService', 'ui.router', 'ui.bootstrap'])

            .controller('PatientDetailsController', PatientDetailsController);

    PatientDetailsController.$inject = ['$state', '$stateParams', 'patientsService'];

    function PatientDetailsController($state, $stateParams, patientsService) {
        var vm = this;

        vm.allowEdit = false;
        vm.cancelEdit = cancelEdit;
        vm.dateOptions = {
            startingDay: 1,
            maxDate: new Date()
        };
        vm.defaultPatientDetails = {};
        vm.employeeDetails = {};
        vm.loadPatientDetails = loadPatientDetails;
        vm.open = open;
        vm.resetPassword = resetPassword;
        vm.startEdit = startEdit;
        vm.updatePatientDetails = updatePatientDetails;

        function cancelEdit() {
            vm.allowEdit = false;
            restorePatientDetails();
        }

        function loadPatientDetails() {
            vm.errorLoading = false;
            vm.loading = true;

            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.getPatientDetails($stateParams.patientPesel)
                        .then(getPatientDetailsSuccess, getPatientDetailsFailure);
            }

            function getPatientDetailsSuccess(patientDetails) {
                $state.get('root.patients.patient').data.breadcrumb = patientDetails[0].surname + ' ' + patientDetails[0].name;
                vm.patientDetails = patientDetails[0];
                vm.patientDetails.dob = new Date(vm.patientDetails.dob);
                saveDefaultPatientDetails();
                vm.errorLoading = false;
                vm.loading = false;
            }

            function getPatientDetailsFailure() {
                vm.errorLoading = true;
                vm.loading = false;
            }
        }

        function open() {
            vm.opened = true;
        }

        function resetPassword() {
            vm.errorReset = false;
            vm.resetting = true;
            vm.successReset = false;

            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.resetPatientPassword(vm.patientDetails.pesel)
                        .then(resetPatientPasswordSuccess, resetPatientPasswordFailure);
            }

            function resetPatientPasswordSuccess() {
                vm.errorReset = false;
                vm.resetting = false;
                vm.successReset = true;
            }

            function resetPatientPasswordFailure() {
                vm.errorReset = true;
                vm.resetting = false;
                vm.successReset = false;
            }
        }

        function restorePatientDetails() {
            angular.copy(vm.defaultPatientDetails, vm.patientDetails);
        }

        function saveDefaultPatientDetails() {
            angular.copy(vm.patientDetails, vm.defaultPatientDetails);
        }

        function startEdit() {
            vm.allowEdit = true;
        }

        function updatePatientDetails() {
            vm.errorEdit = false;
            vm.updating = true;

            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.updatePatientDetails(vm.patientDetails).then(updatePatientDetailsSuccess, updatePatientDetailsFailure);
            }

            function updatePatientDetailsSuccess() {
                saveDefaultPatientDetails();
                vm.allowEdit = false;
                vm.errorEdit = false;
                vm.updating = false;
            }

            function updatePatientDetailsFailure() {
                vm.errorEdit = true;
                vm.updating = false;
            }
        }
    }
})();
