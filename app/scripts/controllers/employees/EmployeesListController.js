angular.module('RehApp')

        .controller('EmployeesListController', function ($scope, $state, EmployeesDataService) {
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
        });
