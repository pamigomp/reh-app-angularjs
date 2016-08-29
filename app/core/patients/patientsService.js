(function () {
    'use strict';

    angular.module('rehApp.patientsService', ['rehApp.dataStorageService', 'ui.router'])

            .factory('patientsService', patientsService);

    patientsService.$inject = ['$q', '$state', 'dataStorageService'];

    function patientsService($q, $state, dataStorageService) {
        var patientsService = {};

        patientsService.getPatientsList = function () {
            var deferred = $q.defer();

            dataStorageService.getPatients().then(
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

        patientsService.getPatientDetails = function (patientPesel) {
            var deferred = $q.defer();

            dataStorageService.getPatient(patientPesel).then(
                    function (patientData) {
                        deferred.resolve(patientData.data.items);
                    },
                    function () {
                        deferred.reject();
                    }
            );
            return deferred.promise;
        };

        patientsService.savePatientDetails = function (patientDetails) {
            var deferred = $q.defer();

            dataStorageService.savePatient(patientDetails).then(
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

        patientsService.removePatient = function (chosenPatient) {
            var deferred = $q.defer();

            dataStorageService.removePatient(chosenPatient).then(
                    function () {
                        deferred.resolve();
                    },
                    function () {
                        deferred.reject();
                    }
            );
            return deferred.promise;
        };

        patientsService.updatePatientDetails = function (patientDetails) {
            var deferred = $q.defer();

            dataStorageService.updatePatient(patientDetails).then(
                    function () {
                        deferred.resolve();
                    },
                    function () {
                        deferred.reject();
                    }
            );
            return deferred.promise;
        };

        patientsService.resetPatientPassword = function (patientPesel) {
            var deferred = $q.defer();

            dataStorageService.resetPatientPassword(patientPesel).then(
                    function () {
                        deferred.resolve();
                    },
                    function () {
                        deferred.reject();
                    }
            );
            return deferred.promise;
        };

        patientsService.getPatientTermsPending = function (patientPesel) {
            var deferred = $q.defer();

            dataStorageService.getPatientTermsPending(patientPesel).then(
                    function (patientData) {
                        deferred.resolve(patientData.data.items);
                    },
                    function () {
                        deferred.reject();
                    }
            );
            return deferred.promise;
        };

        patientsService.getPatientTermsCancelled = function (patientPesel) {
            var deferred = $q.defer();

            dataStorageService.getPatientTermsCancelled(patientPesel).then(
                    function (patientData) {
                        deferred.resolve(patientData.data.items);
                    },
                    function () {
                        deferred.reject();
                    }
            );
            return deferred.promise;
        };

        patientsService.getPatientTermsCompleted = function (patientPesel) {
            var deferred = $q.defer();

            dataStorageService.getPatientTermsCompleted(patientPesel).then(
                    function (patientData) {
                        deferred.resolve(patientData.data.items);
                    },
                    function () {
                        deferred.reject();
                    }
            );
            return deferred.promise;
        };

        patientsService.cancelPatientTerm = function (patienttreatmentid) {
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

        patientsService.completePatientTerm = function (patienttreatmentid) {
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

        return patientsService;
    }
})();
