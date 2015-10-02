'use strict';

angular.module('RehApp')

        .factory('PatientsDataService', function ($q, $state, DataStorageService) {
            var PatientsDataService = {};

            PatientsDataService.getPatientsList = function () {
                var deferred = $q.defer();

                DataStorageService.getPatients().then(
                        function (patientsData) {
                            var list = [];
                            angular.forEach(patientsData.data.items, function (patientData) {
                                list.push(patientData);
                            });
                            deferred.resolve(list);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            PatientsDataService.getPatientDetails = function (patientPesel) {
                var deferred = $q.defer();

                DataStorageService.getPatient(patientPesel).then(
                        function (patientData) {
                            deferred.resolve(patientData.data.items);
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            PatientsDataService.savePatientDetails = function (patientDetails) {
                var deferred = $q.defer();

                DataStorageService.savePatient(patientDetails).then(
                        function () {
                            $state.go('root.patients.list');
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            PatientsDataService.removePatient = function (chosenPatient) {
                var deferred = $q.defer();

                DataStorageService.removePatient(chosenPatient).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            PatientsDataService.updatePatientDetails = function (patientDetails) {
                var deferred = $q.defer();

                DataStorageService.updatePatient(patientDetails).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };

            PatientsDataService.resetPatientPassword = function (patientPesel) {
                var deferred = $q.defer();

                DataStorageService.resetPatientPassword(patientPesel).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                );
                return deferred.promise;
            };
            
            return PatientsDataService;
        });
        