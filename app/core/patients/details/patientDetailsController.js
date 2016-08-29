(function () {
    'use strict';

    angular.module('rehApp.patients.details', ['rehApp.patientsService', 'ui.router'])

            .controller('PatientDetailsController', PatientDetailsController);

    PatientDetailsController.$inject = ['$state', '$stateParams', 'patientsService'];

    function PatientDetailsController($state, $stateParams, patientsService) {
        var vm = this;

        vm.allowEdit = false;
        vm.defaultPatientDetails = {};

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

        vm.loadPatientDetails = function () {
            vm.loading = true;
            vm.errorLoading = false;
            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.getPatientDetails($stateParams.patientPesel).then(
                        function (patientDetails) {
                            $state.get('root.patients.patient').data.breadcrumb = patientDetails[0].surname + ' ' + patientDetails[0].name;
                            vm.patientDetails = patientDetails[0];
                            vm.saveDefaultPatientDetails();
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

        vm.updatePatientDetails = function () {
            vm.updating = true;
            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.updatePatientDetails(vm.patientDetails).then(function () {
                    vm.updating = false;
                    vm.errorEdit = false;
                }, function () {
                    vm.updating = false;
                    vm.errorEdit = true;
                });
            }
        };

        vm.resetPassword = function () {
            vm.resetting = true;
            if (angular.isDefined($stateParams.patientPesel)) {
                patientsService.resetPatientPassword(vm.patientDetails.pesel).then(function () {
                    vm.resetting = false;
                    vm.errorReset = false;
                }, function () {
                    vm.resetting = false;
                    vm.errorReset = true;
                });
            }
        };

        vm.restorePatientDetails = function () {
            angular.copy(vm.defaultPatientDetails, vm.patientDetails);
        };

        vm.saveDefaultPatientDetails = function () {
            angular.copy(vm.patientDetails, vm.defaultPatientDetails);
        };

        //After clicking 'Edytuj' button, we would be able to make changes in the fields.
        vm.startEdit = function () {
            vm.allowEdit = true;
        };

        //After clicking 'Zapisz' button, we would not be able to make changes in the fields
        //and all changes are being saved.
        vm.saveEdit = function () {
            vm.allowEdit = false;
            vm.updatePatientDetails();
        };

        //After clicking 'Anuluj' button, we would not be able to make changes in the fields
        //and all changes are being discarded (loading previous patient's details).
        vm.cancelEdit = function () {
            vm.allowEdit = false;
            vm.restorePatientDetails();
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
