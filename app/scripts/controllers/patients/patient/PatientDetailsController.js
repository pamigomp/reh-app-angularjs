'use strict';

angular.module('RehApp')

        .controller('PatientDetailsController', function ($scope, $state, $stateParams, PatientsDataService) {
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
            
            $scope.loadPatientDetails = function () {
                $scope.loading = true;
                if (angular.isDefined($stateParams.patientPesel)) {
                    PatientsDataService.getPatientDetails($stateParams.patientPesel).then(
                            function (patientDetails) {
                                $state.get('root.patients.patient').data.breadcrumb = $scope.patientDetails.name;
                                $scope.patientDetails = patientDetails;
                                $scope.loading = false;
                            },
                            function () {
                                $scope.loading = false;
                                $scope.error = true;
                            }
                    );
                }
            };
        });
