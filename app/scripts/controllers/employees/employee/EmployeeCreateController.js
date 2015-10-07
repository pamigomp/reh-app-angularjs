'use strict';

angular.module('RehApp')

        .controller('EmployeeCreateController', function ($scope, EmployeesDataService) {
            $scope.employeeDetails = {};
            $scope.errorCreate = false;
            $scope.employeeDetails.country = "Polska";

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

            $scope.saveEmployeeDetails = function () {
                $scope.submitting = true;
                EmployeesDataService.saveEmployeeDetails($scope.employeeDetails).then(
                        function () {
                            $scope.errorCreate = false;
                            $scope.submitting = false;
                        }, function () {
                    $scope.errorCreate = true;
                    $scope.submitting = false;
                });
            };
        });
