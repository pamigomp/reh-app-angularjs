'use strict';

angular.module('RehApp')

        .controller('EmployeeDetailsController', function ($scope, $state, $stateParams, EmployeesDataService) {
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

            $scope.loadEmployeeDetails = function () {
                $scope.loading = true;
                if (angular.isDefined($stateParams.employeeId)) {
                    EmployeesDataService.getEmployeeDetails($stateParams.employeeId).then(
                            function (employeeDetails) {
                                $state.get('root.employees.employee').data.breadcrumb = $scope.employeeDetails.name;
                                $scope.employeeDetails = employeeDetails;
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
