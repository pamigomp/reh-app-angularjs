'use strict';

angular.module('rehApp.employeesService', ['rehApp.dataStorageService'])

        .factory('employeesService', ['$q', '$state', 'dataStorageService', function ($q, $state, dataStorageService) {
                var employeesService = {};

                employeesService.getEmployeesList = function () {
                    var deferred = $q.defer();

                    dataStorageService.getEmployees().then(
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

                employeesService.getEmployeeDetails = function (employeeId) {
                    var deferred = $q.defer();

                    dataStorageService.getEmployee(employeeId).then(
                            function (employeeData) {
                                deferred.resolve(employeeData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                employeesService.saveEmployeeDetails = function (employeeDetails) {
                    var deferred = $q.defer();

                    dataStorageService.saveEmployee(employeeDetails).then(
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

                employeesService.removeEmployee = function (chosenEmployee) {
                    var deferred = $q.defer();

                    dataStorageService.removeEmployee(chosenEmployee).then(
                            function () {
                                deferred.resolve();
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                employeesService.updateEmployeeDetails = function (employeeDetails) {
                    var deferred = $q.defer();

                    dataStorageService.updateEmployee(employeeDetails).then(
                            function () {
                                deferred.resolve();
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                employeesService.getEmployeeTermsPending = function (employeeId) {
                    var deferred = $q.defer();

                    dataStorageService.getEmployeeTermsPending(employeeId).then(
                            function (employeeData) {
                                deferred.resolve(employeeData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                employeesService.getEmployeeTermsCancelled = function (employeeId) {
                    var deferred = $q.defer();

                    dataStorageService.getEmployeeTermsCancelled(employeeId).then(
                            function (employeeData) {
                                deferred.resolve(employeeData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                employeesService.getEmployeeTermsCompleted = function (employeeId) {
                    var deferred = $q.defer();

                    dataStorageService.getEmployeeTermsCompleted(employeeId).then(
                            function (employeeData) {
                                deferred.resolve(employeeData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                employeesService.cancelEmployeeTerm = function (patienttreatmentid) {
                    var deferred = $q.defer();

                    dataStorageService.cancelTerm(patienttreatmentid).then(
                            function () {
                                deferred.resolve();
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                employeesService.completeEmployeeTerm = function (patienttreatmentid) {
                    var deferred = $q.defer();

                    dataStorageService.completeTerm(patienttreatmentid).then(
                            function () {
                                deferred.resolve();
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                return employeesService;
            }]);
