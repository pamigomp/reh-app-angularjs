(function () {
    'use strict';

    angular.module('rehApp.patients.create', ['rehApp.patientsService'])

            .controller('PatientCreateController', PatientCreateController);

    PatientCreateController.$inject = ['patientsService'];

    function PatientCreateController(patientsService) {
        var vm = this;

        vm.dateOptions = {
            startingDay: 1,
            maxDate: new Date()
        };
        vm.patientDetails = {};
        vm.patientDetails.country = 'Polska';
        vm.errorCreate = false;
        vm.open = open;
        vm.open2 = open2;
        vm.opened = false;
        vm.opened2 = false;
        vm.savePatientDetails = savePatientDetails;
        vm.submitting = false;

        function open() {
            vm.opened = true;
        }

        function open2() {
            vm.opened2 = true;
        }

        function savePatientDetails() {
            vm.errorCreate = false;
            vm.submitting = true;
            patientsService.savePatientDetails(vm.patientDetails)
                    .then(savePatientDetailsSuccess, savePatientDetailsFailure);

            function savePatientDetailsSuccess() {
                vm.errorCreate = false;
                vm.submitting = false;
            }

            function savePatientDetailsFailure() {
                vm.errorCreate = true;
                vm.submitting = false;
            }
        }
    }
})();
