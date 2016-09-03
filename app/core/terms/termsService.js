(function () {
    'use strict';

    angular.module('rehApp.termsService', ['rehApp.dataStorageService'])

            .factory('termsService', termsService);

    termsService.$inject = ['$q', 'dataStorageService'];

    function termsService($q, dataStorageService) {
        return {
            cancelTerm: cancelTerm,
            completeTerm: completeTerm,
            getEmployeesList: getEmployeesList,
            getIcdsList: getIcdsList,
            getPatientsList: getPatientsList,
            getRoomsList: getRoomsList,
            getTermPendingDetails: getTermPendingDetails,
            getTermsCancelled: getTermsCancelled,
            getTermsCompleted: getTermsCompleted,
            getTermsPending: getTermsPending,
            getTreatmentsList: getTreatmentsList,
            saveTerms: saveTerms,
            updateTermPendingDetails: updateTermPendingDetails
        };

        function getTermsPending() {
            var deferred = $q.defer();

            dataStorageService.getTermsPending()
                    .then(getTermsPendingSuccess, getTermsPendingFailure);

            function getTermsPendingSuccess(employeeData) {
                deferred.resolve(employeeData.data.items);
            }

            function getTermsPendingFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getTermPendingDetails(termId) {
            var deferred = $q.defer();

            dataStorageService.getTermPending(termId)
                    .then(getTermPendingSuccess, getTermPendingFailure);

            function getTermPendingSuccess(termPendingData) {
                deferred.resolve(termPendingData.data.items);
            }

            function getTermPendingFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function updateTermPendingDetails(termPendingDetails) {
            var deferred = $q.defer();

            dataStorageService.updateTermPending(termPendingDetails)
                    .then(updateTermPendingSuccess, updateTermPendingFailure);

            function updateTermPendingSuccess() {
                deferred.resolve();
            }

            function updateTermPendingFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getTermsCancelled() {
            var deferred = $q.defer();

            dataStorageService.getTermsCancelled()
                    .then(getTermsCancelledSuccess, getTermsCancelledFailure);

            function getTermsCancelledSuccess(employeeData) {
                deferred.resolve(employeeData.data.items);
            }

            function getTermsCancelledFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getTermsCompleted() {
            var deferred = $q.defer();

            dataStorageService.getTermsCompleted()
                    .then(getTermsCompletedSuccess, getTermsCompletedFailure);

            function getTermsCompletedSuccess(employeeData) {
                deferred.resolve(employeeData.data.items);
            }

            function getTermsCompletedFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function cancelTerm(patienttreatmentid) {
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

        function completeTerm(patienttreatmentid) {
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

        function getEmployeesList() {
            var deferred = $q.defer();

            dataStorageService.getEmployees()
                    .then(getEmployeesSuccess, getEmployeesFailure);

            function getEmployeesSuccess(employeeData) {
                deferred.resolve(employeeData.data.items);
            }

            function getEmployeesFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getRoomsList() {
            var deferred = $q.defer();

            dataStorageService.getRooms()
                    .then(getRoomsSuccess, getRoomsFailure);

            function getRoomsSuccess(roomData) {
                deferred.resolve(roomData.data.items);
            }

            function getRoomsFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getTreatmentsList() {
            var deferred = $q.defer();

            dataStorageService.getTreatments()
                    .then(getTreatmentsSuccess, getTreatmentsFailure);

            function getTreatmentsSuccess(treatmentData) {
                deferred.resolve(treatmentData.data.items);
            }

            function getTreatmentsFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getPatientsList() {
            var deferred = $q.defer();

            dataStorageService.getPatients()
                    .then(getPatientsSuccess, getPatientsFailure);

            function getPatientsSuccess(patientData) {
                deferred.resolve(patientData.data.items);
            }

            function getPatientsFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getIcdsList() {
            var deferred = $q.defer();

            dataStorageService.getIcds()
                    .then(getIcdsSuccess, getIcdsFailure);

            function getIcdsSuccess(icdData) {
                deferred.resolve(icdData.data.items);
            }

            function getIcdsFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function saveTerms(terms) {
            var deferred = $q.defer();

            dataStorageService.saveTerms(terms)
                    .then(saveTermsSuccess, saveTermsFailure);

            function saveTermsSuccess() {
                deferred.resolve();
            }

            function saveTermsFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }
    }
})();
