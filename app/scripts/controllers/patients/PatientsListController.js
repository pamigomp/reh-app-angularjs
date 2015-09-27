angular.module('RehApp')

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
        });
