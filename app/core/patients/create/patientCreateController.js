(function () {
    'use strict';

    angular.module('rehApp.patients.create', ['rehApp.patientsService'])

            .controller('PatientCreateController', PatientCreateController);

    PatientCreateController.$inject = ['patientsService'];

    function PatientCreateController(patientsService) {
        var vm = this;

        vm.patientDetails = {};
        vm.errorCreate = false;
        vm.patientDetails.country = 'Polska';

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

        vm.savePatientDetails = function () {
            vm.submitting = true;
            patientsService.savePatientDetails(vm.patientDetails).then(
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
