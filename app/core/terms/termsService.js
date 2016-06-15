'use strict';

angular.module('rehApp.termsService', ['rehApp.dataStorageService'])

        .factory('termsService', ['$q', 'dataStorageService', function ($q, dataStorageService) {
                var termsService = {};

                termsService.getTermsPending = function () {
                    var deferred = $q.defer();

                    dataStorageService.getTermsPending().then(
                            function (employeeData) {
                                deferred.resolve(employeeData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.getTermPendingDetails = function (termId) {
                    var deferred = $q.defer();

                    dataStorageService.getTermPending(termId).then(
                            function (termPendingData) {
                                deferred.resolve(termPendingData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.updateTermPendingDetails = function (termPendingDetails) {
                    var deferred = $q.defer();

                    dataStorageService.updateTermPending(termPendingDetails).then(
                            function () {
                                deferred.resolve();
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.getTermsCancelled = function () {
                    var deferred = $q.defer();

                    dataStorageService.getTermsCancelled().then(
                            function (employeeData) {
                                deferred.resolve(employeeData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.getTermsCompleted = function () {
                    var deferred = $q.defer();

                    dataStorageService.getTermsCompleted().then(
                            function (employeeData) {
                                deferred.resolve(employeeData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.cancelTerm = function (patienttreatmentid) {
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

                termsService.completeTerm = function (patienttreatmentid) {
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

                termsService.getEmployeesList = function () {
                    var deferred = $q.defer();

                    dataStorageService.getEmployees().then(
                            function (employeeData) {
                                deferred.resolve(employeeData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.getRoomsList = function () {
                    var deferred = $q.defer();

                    dataStorageService.getRooms().then(
                            function (roomData) {
                                deferred.resolve(roomData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.getTreatmentsList = function () {
                    var deferred = $q.defer();

                    dataStorageService.getTreatments().then(
                            function (treatmentData) {
                                deferred.resolve(treatmentData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.getPatientsList = function () {
                    var deferred = $q.defer();

                    dataStorageService.getPatients().then(
                            function (patientData) {
                                deferred.resolve(patientData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.getIcdsList = function () {
                    var deferred = $q.defer();

                    dataStorageService.getIcds().then(
                            function (icdData) {
                                deferred.resolve(icdData.data.items);
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                termsService.saveTerms = function (terms) {
                    var deferred = $q.defer();

                    dataStorageService.saveTerms(terms).then(
                            function () {
                                deferred.resolve();
                            },
                            function () {
                                deferred.reject();
                            }
                    );
                    return deferred.promise;
                };

                return termsService;
            }]);
