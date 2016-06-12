'use strict';

angular.module('rehApp')

        .controller('PatientsListController', function ($scope, $state, PatientsDataService) {

            $scope.loadPatientsList = function () {
                $scope.loading = true;

                PatientsDataService.getPatientsList().then(function (patientsList) {
                    if (patientsList.length === 0) {
                        $scope.loading = false;
                        $state.go('root.patients.list_empty');
                    } else {
                        $scope.patients = patientsList;
                        $scope.loading = false;
                    }
                }, function () {
                    $scope.loading = false;
                    $state.go('root.patients.list_error');
                });
            };

            $scope.removePatient = function () {
                $scope.removing = true;
                $scope.errorRemove = false;

                PatientsDataService.removePatient($scope.chosenPatient.pesel).then(function () {
                    if ($scope.patients.length - 1 === 0)
                        $state.go('root.patients.list_empty');
                    else
                        $scope.loadPatientsList();
                }, function () {
                    $scope.removing = false;
                    $scope.errorRemove = true;
                });
            };

            $scope.setChosen = function (patient) {
                $scope.chosenPatient = patient;
            };
        });
