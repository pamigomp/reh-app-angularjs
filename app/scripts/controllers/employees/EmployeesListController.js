'use strict';

angular.module('RehApp')

        .controller('EmployeesListController', function ($scope, $state, EmployeesDataService) {
            $scope.chosenEmployee;

            $scope.loadEmployeesList = function () {
                $scope.loading = true;

                EmployeesDataService.getEmployeesList().then(function (employeesList) {
                    if (employeesList.length === 0) {
                        $scope.loading = false;
                        $state.go('root.employees.list_empty');
                    } else {
                        $scope.employees = employeesList;
                        $scope.loading = false;
                    }
                }, function () {
                    $scope.loading = false;
                    $state.go('root.employees.list_error');
                });
            };

            $scope.removeEmployee = function () {
                $scope.removing = true;
                $scope.errorRemove = false;

                EmployeesDataService.removeEmployee($scope.chosenEmployee.employeeid).then(function () {
                    if ($scope.employees.length - 1 === 0)
                        $state.go('root.employees.list_empty');
                    else
                        $scope.loadEmployeesList();
                }, function () {
                    $scope.removing = false;
                    $scope.errorRemove = true;
                });
            };

            $scope.setChosen = function (employee) {
                $scope.chosenEmployee = employee;
            };
        });
