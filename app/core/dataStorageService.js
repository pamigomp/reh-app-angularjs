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
            getRooms: getRooms,
            getPatients: getPatients,
            getPatientTermsCancelled: getPatientTermsCancelled,
            getPatientTermsCompleted: getPatientTermsCompleted,
            getPatientTermsPending: getPatientTermsPending,
            getTermPending: getTermPending,
            getTermsCancelled: getTermsCancelled,
            getTermsCompleted: getTermsCompleted,
            getTermsPending: getTermsPending,
            getTreatments: getTreatments,
            removeEmployee: removeEmployee,
            removePatient: removePatient,
            resetPatientPassword: resetPatientPassword,
            saveEmployee: saveEmployee,
            savePatient: savePatient,
            saveTerms: saveTerms,
            updateEmployee: updateEmployee,
            updatePatient: updatePatient,
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

        function cancelTerm(patienttreatmentid) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/cancel/' + patienttreatmentid
            });
        }

        function completeTerm(patienttreatmentid) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/complete/' + patienttreatmentid
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

        function updatePatient(patientDetails) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientDetails.pesel,
                data: patientDetails
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

        function saveTerms(terms) {
            return $http({
                method: 'POST',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending',
                data: terms
            });
        }

        function verifyCredentials(email) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/verify/' + email
            });
        }
    }
})();
