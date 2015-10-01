'use strict';

angular.module('RehApp')

        .controller('PatientCreateController', function ($scope, PatientsDataService) {
            $scope.patientDetails = {};
            $scope.errorCreate = false;

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
                PatientsDataService.savePatientDetails($scope.patientDetails).then(
                        function () {
                            $scope.errorCreate = false;
                            $scope.submitting = false;
                        }, function () {
                    $scope.errorCreate = true;
                    $scope.submitting = false;
                });
            };
        });
