angular.module('RehApp')

        .controller('PatientDetailsController', function ($scope, $stateParams, PatientsDataService) {
            $scope.loadPatientDetails = function () {
                $scope.loading = true;
                if (angular.isDefined($stateParams.patientPesel)) {
                    PatientsDataService.getPatientDetails($stateParams.patientPesel).then(function (patientDetails) {
                        $scope.patientDetails = patientDetails;
                        $scope.loading = false;
                    }, function () {
                        $scope.loading = false;
                        $scope.error = true;
                    });
                }
            };
        });
