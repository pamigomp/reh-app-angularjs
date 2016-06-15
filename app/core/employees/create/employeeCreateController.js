'use strict';

angular.module('rehApp.employees.create', ['rehApp.employeesService'])

        .controller('EmployeeCreateController', ['$scope', 'employeesService', function ($scope, employeesService) {
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
                    employeesService.saveEmployeeDetails($scope.employeeDetails).then(
                            function () {
                                $scope.errorCreate = false;
                                $scope.submitting = false;
                            }, function () {
                        $scope.errorCreate = true;
                        $scope.submitting = false;
                    });
                };

                $scope.maxDate = new Date();
                $scope.valuationDatePickerIsOpen = false;
                $scope.valuationDatePickerIsOpen2 = false;

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

                $scope.valuationDatePickerOpen2 = function ($event) {
                    if ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                    }

                    $scope.valuationDatePickerIsOpen2 = true;
                };
            }]);