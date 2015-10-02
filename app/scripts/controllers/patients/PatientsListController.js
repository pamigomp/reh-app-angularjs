'use strict';

angular.module('RehApp')

        .controller('PatientsListController', function ($scope, $state, PatientsDataService) {
            $scope.chosenPatient;

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

                PatientsDataService.removePatient($scope.chosenPatient).then(function () {
                    if ($scope.patients.length - 1 === 0)
                        $state.go('root.patients.list_empty');
                    else
                        $scope.loadPatientsList();
                }, function () {
                    $scope.removing = false;
                    $scope.errorRemove = true;
                });
            };

            $scope.setChosen = function (pesel) {
                $scope.chosenPatient = pesel;
            };
        });
