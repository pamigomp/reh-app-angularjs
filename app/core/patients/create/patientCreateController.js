(function () {
    'use strict';

    angular.module('rehApp.patients.create', ['rehApp.patientsService'])

            .controller('PatientCreateController', PatientCreateController);

    PatientCreateController.$inject = ['$scope', 'patientsService'];

    function PatientCreateController($scope, patientsService) {
        $scope.patientDetails = {};
        $scope.errorCreate = false;
        $scope.patientDetails.country = "Polska";

        $scope.rangeDays = function () {
            var input = [];
            for (var i = 1; i <= 31; i++)
                input.push(i);
            return input;
        };

        $scope.rangeYears = function (max, min) {
            var input = [];
            for (var i = max; i >= min; i -= 1)
                input.push(i);
            return input;
        };

        $scope.savePatientDetails = function () {
            $scope.submitting = true;
            patientsService.savePatientDetails($scope.patientDetails).then(
                    function () {
                        $scope.errorCreate = false;
                        $scope.submitting = false;
                    }, function () {
                $scope.errorCreate = true;
                $scope.submitting = false;
            });
        };

        $scope.maxDate = new Date();
        $scope.valuationDatePickerIsOpen = false;

        $scope.dateOptions = {
            'starting-day': 1
        };

        $scope.valuationDatePickerOpen = function ($event) {
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            }

            $scope.valuationDatePickerIsOpen = true;
        };
    }
})();
