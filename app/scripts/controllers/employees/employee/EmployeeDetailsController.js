'use strict';

angular.module('RehApp')

        .controller('EmployeeDetailsController', function ($scope, $state, $stateParams, EmployeesDataService) {
            $scope.allowEdit = false;
            $scope.defaultEmployeeDetails = {};
            
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
                $scope.errorLoading = false;
                if (angular.isDefined($stateParams.employeeId)) {
                    EmployeesDataService.getEmployeeDetails($stateParams.employeeId).then(
                            function (employeeDetails) {
                                $state.get('root.employees.employee').data.breadcrumb = employeeDetails[0].surname + ' ' + employeeDetails[0].name;
                                $scope.employeeDetails = employeeDetails[0];
                                $scope.saveDefaultEmployeeDetails();
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

            $scope.updateEmployeeDetails = function () {
                $scope.updating = true;
                if (angular.isDefined($stateParams.employeePesel)) {
                    EmployeesDataService.updateEmployeeDetails($scope.employeeDetails).then(function () {
                        $scope.updating = false;
                        $scope.errorEdit = false;
                    }, function () {
                        $scope.updating = false;
                        $scope.errorEdit = true;
                    });
                }
            };

            $scope.restoreEmployeeDetails = function () {
                angular.copy($scope.defaultEmployeeDetails, $scope.employeeDetails);
            };

            $scope.saveDefaultEmployeeDetails = function () {
                angular.copy($scope.employeeDetails, $scope.defaultEmployeeDetails);
            };

            //After clicking 'Edytuj' button, we would be able to make changes in the fields.
            $scope.startEdit = function () {
                $scope.allowEdit = true;
            };

            //After clicking 'Zapisz' button, we would not be able to make changes in the fields
            //and all changes are being saved.
            $scope.saveEdit = function () {
                $scope.allowEdit = false;
                $scope.updateEmployeeDetails();
            };

            //After clicking 'Anuluj' button, we would not be able to make changes in the fields
            //and all changes are being discarded (loading previous employee's details).
            $scope.cancelEdit = function () {
                $scope.allowEdit = false;
                $scope.restoreEmployeeDetails();
            };
        });
