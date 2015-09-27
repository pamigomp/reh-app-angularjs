'use strict';

angular.module('RehApp')

        .factory('EmployeesDataService', function ($q, DataStorageService) {
            var EmployeesDataService = {};

            EmployeesDataService.getEmployeesList = function () {
                var deferred = $q.defer();

                DataStorageService.getEmployees().then(
                        function (employeesData) {
                            var list = [];
                            angular.forEach(employeesData.data.items, function (employeeData) {
                                list.push(employeeData);
                            });
                            deferred.resolve(list);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };
            
            return EmployeesDataService;
        });
        