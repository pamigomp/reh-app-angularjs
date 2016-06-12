'use strict';

angular.module('rehApp')

        .controller('PatientDetailsController', function ($scope, $state, $stateParams, PatientsDataService) {
            $scope.allowEdit = false;
            $scope.defaultPatientDetails = {};

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
                $scope.errorLoading = false;
                if (angular.isDefined($stateParams.patientPesel)) {
                    PatientsDataService.getPatientDetails($stateParams.patientPesel).then(
                            function (patientDetails) {
                                $state.get('root.patients.patient').data.breadcrumb = patientDetails[0].surname + ' ' + patientDetails[0].name;
                                $scope.patientDetails = patientDetails[0];
                                $scope.saveDefaultPatientDetails();
                                $scope.loading = false;
                                $scope.errorLoading = false;
                            },
                            function () {
                                $scope.loading = false;
                                $scope.errorLoading = true;
                            }
                    );
                }
            };

            $scope.updatePatientDetails = function () {
                $scope.updating = true;
                if (angular.isDefined($stateParams.patientPesel)) {
                    PatientsDataService.updatePatientDetails($scope.patientDetails).then(function () {
                        $scope.updating = false;
                        $scope.errorEdit = false;
                    }, function () {
                        $scope.updating = false;
                        $scope.errorEdit = true;
                    });
                }
            };

            $scope.resetPassword = function () {
                $scope.resetting = true;
                if (angular.isDefined($stateParams.patientPesel)) {
                    PatientsDataService.resetPatientPassword($scope.patientDetails.pesel).then(function () {
                        $scope.resetting = false;
                        $scope.errorReset = false;
                    }, function () {
                        $scope.resetting = false;
                        $scope.errorReset = true;
                    });
                }
            };

            $scope.restorePatientDetails = function () {
                angular.copy($scope.defaultPatientDetails, $scope.patientDetails);
            };

            $scope.saveDefaultPatientDetails = function () {
                angular.copy($scope.patientDetails, $scope.defaultPatientDetails);
            };

            //After clicking 'Edytuj' button, we would be able to make changes in the fields.
            $scope.startEdit = function () {
                $scope.allowEdit = true;
            };

            //After clicking 'Zapisz' button, we would not be able to make changes in the fields
            //and all changes are being saved.
            $scope.saveEdit = function () {
                $scope.allowEdit = false;
                $scope.updatePatientDetails();
            };

            //After clicking 'Anuluj' button, we would not be able to make changes in the fields
            //and all changes are being discarded (loading previous patient's details).
            $scope.cancelEdit = function () {
                $scope.allowEdit = false;
                $scope.restorePatientDetails();
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
        });
