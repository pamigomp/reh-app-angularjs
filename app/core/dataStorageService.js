(function () {
    'use strict';

    angular.module('rehApp.dataStorageService', [])
            .factory('dataStorageService', dataStorageService);

    dataStorageService.$inject = ['$http'];

    function dataStorageService($http) {
        return {
            cancelTerm: cancelTerm,
            completeTerm: completeTerm,
            getEmployee: getEmployee,
            getEmployeeTermsPending: getEmployeeTermsPending,
            getEmployeeTermsCompleted: getEmployeeTermsCompleted,
            getEmployeeTermsCancelled: getEmployeeTermsCancelled,
            getEmployees: getEmployees,
            getIcds: getIcds,
            getPatient: getPatient,
            getPatients: getPatients,
            getPatientTermsCancelled: getPatientTermsCancelled,
            getPatientTermsCompleted: getPatientTermsCompleted,
            getPatientTermsPending: getPatientTermsPending,
            getRooms: getRooms,
            getTermPending: getTermPending,
            getTermsCancelled: getTermsCancelled,
            getTermsCompleted: getTermsCompleted,
            getTermsPending: getTermsPending,
            getTreatment: getTreatment,
            getTreatments: getTreatments,
            removeEmployee: removeEmployee,
            removePatient: removePatient,
            removeTreatment: removeTreatment,
            resetPatientPassword: resetPatientPassword,
            saveEmployee: saveEmployee,
            savePatient: savePatient,
            saveTerms: saveTerms,
            saveTreatment: saveTreatment,
            updateEmployee: updateEmployee,
            updatePatient: updatePatient,
            updateTreatment: updateTreatment,
            verifyCredentials: verifyCredentials,
            updateTermPending: updateTermPending
        };

        function getTermsPending() {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending'
            });
        }

        function getTermPending(termId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending/' + termId
            });
        }

        function updateTermPending(termPendingDetails) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending/' + termPendingDetails.patienttreatmentid,
                data: termPendingDetails
            });
        }

        function getTermsCancelled() {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/cancelled'
            });
        }

        function getTermsCompleted() {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/completed'
            });
        }

        function cancelTerm(treatmentId) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/cancel/' + treatmentId
            });
        }

        function completeTerm(treatmentId) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/complete/' + treatmentId
            });
        }

        function getEmployees() {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees'
            });
        }

        function getEmployee(employeeId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeId
            });
        }

        function saveEmployee(employeeDetails) {
            return $http({
                method: 'POST',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees',
                data: employeeDetails
            });
        }

        function removeEmployee(employeeId) {
            return $http({
                method: 'DELETE',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeId
            });
        }

        function updateEmployee(employeeDetails) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeDetails.employeeid,
                data: employeeDetails
            });
        }

        function getEmployeeTermsPending(employeeId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/pending/' + employeeId
            });
        }

        function getEmployeeTermsCompleted(employeeId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/completed/' + employeeId
            });
        }

        function getEmployeeTermsCancelled(employeeId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/cancelled/' + employeeId
            });
        }

        function getPatients() {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients'
            });
        }

        function getPatient(patientPesel) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientPesel
            });
        }

        function savePatient(patientDetails) {
            return $http({
                method: 'POST',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients',
                data: patientDetails
            });
        }

        function removePatient(patientPesel) {
            return $http({
                method: 'DELETE',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientPesel
            });
        }

        function removeTreatment(treatmentId) {
            return $http({
                method: 'DELETE',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/treatments/' + treatmentId
            });
        }

        function updatePatient(patientDetails) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientDetails.pesel,
                data: patientDetails
            });
        }

        function updateTreatment(treatmentDetails) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/treatments/' + treatmentDetails.treatmentId,
                data: treatmentDetails
            });
        }

        function resetPatientPassword(patientPesel) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/passwords/' + patientPesel
            });
        }

        function getPatientTermsPending(patientPesel) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/pending/' + patientPesel
            });
        }

        function getPatientTermsCompleted(patientPesel) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/completed/' + patientPesel
            });
        }

        function getPatientTermsCancelled(patientPesel) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/cancelled/' + patientPesel
            });
        }

        function getRooms() {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/rooms'
            });
        }

        function getTreatments() {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/treatments'
            });
        }

        function getIcds() {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/icds'
            });
        }

        function saveTerms(term) {
            return $http({
                method: 'POST',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending',
                data: term
            });
        }

        function saveTreatment(treatment) {
            return $http({
                method: 'POST',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/treatments',
                data: treatment
            });
        }

        function verifyCredentials(email) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/verify/' + email
            });
        }

        function getTreatment(treatmentId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/treatments/' + treatmentId
            });
        }
    }
})();
