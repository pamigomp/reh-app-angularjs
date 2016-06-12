'use strict';

angular.module('rehApp')

        .factory('EmployeesDataService', function ($q, $state, DataStorageService) {
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
                        }
                );
                return deferred.promise;
            };

            EmployeesDataService.getEmployeeDetails = function (employeeId) {
                var deferred = $q.defer();

                DataStorageService.getEmployee(employeeId).then(
                        function (employeeData) {
                            deferred.resolve(employeeData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            EmployeesDataService.saveEmployeeDetails = function (employeeDetails) {
                var deferred = $q.defer();

                DataStorageService.saveEmployee(employeeDetails).then(
                        function () {
                            $state.go('root.employees.list');
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            EmployeesDataService.removeEmployee = function (chosenEmployee) {
                var deferred = $q.defer();

                DataStorageService.removeEmployee(chosenEmployee).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            EmployeesDataService.updateEmployeeDetails = function (employeeDetails) {
                var deferred = $q.defer();

                DataStorageService.updateEmployee(employeeDetails).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            EmployeesDataService.getEmployeeTermsPending = function (employeeId) {
                var deferred = $q.defer();

                DataStorageService.getEmployeeTermsPending(employeeId).then(
                        function (employeeData) {
                            deferred.resolve(employeeData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            EmployeesDataService.getEmployeeTermsCancelled = function (employeeId) {
                var deferred = $q.defer();

                DataStorageService.getEmployeeTermsCancelled(employeeId).then(
                        function (employeeData) {
                            deferred.resolve(employeeData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            EmployeesDataService.getEmployeeTermsCompleted = function (employeeId) {
                var deferred = $q.defer();

                DataStorageService.getEmployeeTermsCompleted(employeeId).then(
                        function (employeeData) {
                            deferred.resolve(employeeData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            EmployeesDataService.cancelEmployeeTerm = function (patienttreatmentid) {
                var deferred = $q.defer();

                DataStorageService.cancelTerm(patienttreatmentid).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };
            
            EmployeesDataService.completeEmployeeTerm = function (patienttreatmentid) {
                var deferred = $q.defer();

                DataStorageService.completeTerm(patienttreatmentid).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            return EmployeesDataService;
        });
        