'use strict';

angular.module('rehApp')

        .factory('TermsDataService', function ($q, DataStorageService) {
            var TermsDataService = {};

            TermsDataService.getTermsPending = function () {
                var deferred = $q.defer();

                DataStorageService.getTermsPending().then(
                        function (employeeData) {
                            deferred.resolve(employeeData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            TermsDataService.getTermPendingDetails = function (termId) {
                var deferred = $q.defer();

                DataStorageService.getTermPending(termId).then(
                        function (termPendingData) {
                            deferred.resolve(termPendingData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            TermsDataService.updateTermPendingDetails = function (termPendingDetails) {
                var deferred = $q.defer();

                DataStorageService.updateTermPending(termPendingDetails).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            TermsDataService.getTermsCancelled = function () {
                var deferred = $q.defer();

                DataStorageService.getTermsCancelled().then(
                        function (employeeData) {
                            deferred.resolve(employeeData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            TermsDataService.getTermsCompleted = function () {
                var deferred = $q.defer();

                DataStorageService.getTermsCompleted().then(
                        function (employeeData) {
                            deferred.resolve(employeeData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            TermsDataService.cancelTerm = function (patienttreatmentid) {
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

            TermsDataService.completeTerm = function (patienttreatmentid) {
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

            TermsDataService.getEmployeesList = function () {
                var deferred = $q.defer();

                DataStorageService.getEmployees().then(
                        function (employeeData) {
                            deferred.resolve(employeeData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            TermsDataService.getRoomsList = function () {
                var deferred = $q.defer();

                DataStorageService.getRooms().then(
                        function (roomData) {
                            deferred.resolve(roomData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            TermsDataService.getTreatmentsList = function () {
                var deferred = $q.defer();

                DataStorageService.getTreatments().then(
                        function (treatmentData) {
                            deferred.resolve(treatmentData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            TermsDataService.getPatientsList = function () {
                var deferred = $q.defer();

                DataStorageService.getPatients().then(
                        function (patientData) {
                            deferred.resolve(patientData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            TermsDataService.getIcdsList = function () {
                var deferred = $q.defer();

                DataStorageService.getIcds().then(
                        function (icdData) {
                            deferred.resolve(icdData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };
            
            TermsDataService.saveTerms = function (terms) {
                var deferred = $q.defer();

                DataStorageService.saveTerms(terms).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };
            
            return TermsDataService;
        });
        