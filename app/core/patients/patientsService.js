(function () {
    'use strict';

    angular.module('rehApp.patientsService', ['rehApp.dataStorageService', 'ui.router'])

            .factory('patientsService', patientsService);

    patientsService.$inject = ['$q', '$state', 'dataStorageService'];

    function patientsService($q, $state, dataStorageService) {
        return {
            cancelPatientTerm: cancelPatientTerm,
            completePatientTerm: completePatientTerm,
            getPatientDetails: getPatientDetails,
            getPatientsList: getPatientsList,
            getPatientTermsCancelled: getPatientTermsCancelled,
            getPatientTermsCompleted: getPatientTermsCompleted,
            getPatientTermsPending: getPatientTermsPending,
            removePatient: removePatient,
            resetPatientPassword: resetPatientPassword,
            savePatientDetails: savePatientDetails,
            updatePatientDetails: updatePatientDetails
        };

        function getPatientsList() {
            var deferred = $q.defer();

            dataStorageService.getPatients()
                    .then(getPatientsSuccess, getPatientsFailure);

            function getPatientsSuccess(patientsData) {
                var list = [];

                angular.forEach(patientsData.data.items, function (patientData) {
                    list.push(patientData);
                });

                deferred.resolve(list);
            }

            function getPatientsFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getPatientDetails(patientPesel) {
            var deferred = $q.defer();

            dataStorageService.getPatient(patientPesel)
                    .then(getPatientSuccess, getPatientFailure);

            function getPatientSuccess(patientData) {
                deferred.resolve(patientData.data.items);
            }

            function getPatientFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function savePatientDetails(patientDetails) {
            var deferred = $q.defer();

            dataStorageService.savePatient(patientDetails)
                    .then(savePatientSuccess, savePatientFailure);

            function savePatientSuccess() {
                $state.go('root.patients.list');
                deferred.resolve();
            }

            function savePatientFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function removePatient(chosenPatient) {
            var deferred = $q.defer();

            dataStorageService.removePatient(chosenPatient)
                    .then(removePatientSuccess, removePatientFailure);

            function removePatientSuccess() {
                deferred.resolve();
            }

            function removePatientFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function updatePatientDetails(patientDetails) {
            var deferred = $q.defer();

            dataStorageService.updatePatient(patientDetails)
                    .then(updatePatientSuccess, updatePatientFailure);

            function updatePatientSuccess() {
                deferred.resolve();
            }

            function updatePatientFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function resetPatientPassword(patientPesel) {
            var deferred = $q.defer();

            dataStorageService.resetPatientPassword(patientPesel)
                    .then(resetPatientPasswordSuccess, resetPatientPasswordFailure)

            function resetPatientPasswordSuccess() {
                deferred.resolve();
            }

            function resetPatientPasswordFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getPatientTermsPending(patientPesel) {
            var deferred = $q.defer();

            dataStorageService.getPatientTermsPending(patientPesel)
                    .then(getPatientTermsPendingSuccess, getPatientTermsPendingFailure);

            function getPatientTermsPendingSuccess(patientData) {
                deferred.resolve(patientData.data.items);
            }

            function getPatientTermsPendingFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getPatientTermsCancelled(patientPesel) {
            var deferred = $q.defer();

            dataStorageService.getPatientTermsCancelled(patientPesel)
                    .then(getPatientTermsCancelledSuccess, getPatientTermsCancelledFailure);

            function getPatientTermsCancelledSuccess(patientData) {
                deferred.resolve(patientData.data.items);
            }

            function getPatientTermsCancelledFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getPatientTermsCompleted(patientPesel) {
            var deferred = $q.defer();

            dataStorageService.getPatientTermsCompleted(patientPesel)
                    .then(getPatientTermsCompletedSuccess, getPatientTermsCompletedFailure);

            function getPatientTermsCompletedSuccess(patientData) {
                deferred.resolve(patientData.data.items);
            }

            function getPatientTermsCompletedFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function cancelPatientTerm(patienttreatmentid) {
            var deferred = $q.defer();

            dataStorageService.cancelTerm(patienttreatmentid)
                    .then(cancelTermSuccess, cancelTermFailure);

            function cancelTermSuccess() {
                deferred.resolve();
            }

            function cancelTermFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function completePatientTerm(patienttreatmentid) {
            var deferred = $q.defer();

            dataStorageService.completeTerm(patienttreatmentid)
                    .then(completeTermSuccess, completeTermFailure);

            function completeTermSuccess() {
                deferred.resolve();
            }

            function completeTermFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }
    }
})();
