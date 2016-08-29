(function () {
    'use strict';

    angular.module('rehApp.dataStorageService', [])
            .factory('dataStorageService', dataStorageService);

    dataStorageService.$inject = ['$http'];

    function dataStorageService($http) {
        var dataStorageService = {};

        dataStorageService.getTermsPending = function () {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending'
            });
        };

        dataStorageService.getTermPending = function (termId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending/' + termId
            });
        };

        dataStorageService.updateTermPending = function (termPendingDetails) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending/' + termPendingDetails.patienttreatmentid,
                data: termPendingDetails
            });
        };

        dataStorageService.getTermsCancelled = function () {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/cancelled'
            });
        };

        dataStorageService.getTermsCompleted = function () {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/completed'
            });
        };

        dataStorageService.cancelTerm = function (patienttreatmentid) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/cancel/' + patienttreatmentid
            });
        };

        dataStorageService.completeTerm = function (patienttreatmentid) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/complete/' + patienttreatmentid
            });
        };

        dataStorageService.getEmployees = function () {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees'
            });
        };

        dataStorageService.getEmployee = function (employeeId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeId
            });
        };

        dataStorageService.saveEmployee = function (employeeDetails) {
            return $http({
                method: 'POST',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees',
                data: employeeDetails
            });
        };

        dataStorageService.removeEmployee = function (employeeId) {
            return $http({
                method: 'DELETE',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeId
            });
        };

        dataStorageService.updateEmployee = function (employeeDetails) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeDetails.employeeid,
                data: employeeDetails
            });
        };

        dataStorageService.getEmployeeTermsPending = function (employeeId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/pending/' + employeeId
            });
        };

        dataStorageService.getEmployeeTermsCompleted = function (employeeId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/completed/' + employeeId
            });
        };

        dataStorageService.getEmployeeTermsCancelled = function (employeeId) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/cancelled/' + employeeId
            });
        };

        dataStorageService.getPatients = function () {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients'
            });
        };

        dataStorageService.getPatient = function (patientPesel) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientPesel
            });
        };

        dataStorageService.savePatient = function (patientDetails) {
            return $http({
                method: 'POST',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients',
                data: patientDetails
            });
        };

        dataStorageService.removePatient = function (patientPesel) {
            return $http({
                method: 'DELETE',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientPesel
            });
        };

        dataStorageService.updatePatient = function (patientDetails) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientDetails.pesel,
                data: patientDetails
            });
        };

        dataStorageService.resetPatientPassword = function (patientPesel) {
            return $http({
                method: 'PUT',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/passwords/' + patientPesel
            });
        };

        dataStorageService.getPatientTermsPending = function (patientPesel) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/pending/' + patientPesel
            });
        };

        dataStorageService.getPatientTermsCompleted = function (patientPesel) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/completed/' + patientPesel
            });
        };

        dataStorageService.getPatientTermsCancelled = function (patientPesel) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/cancelled/' + patientPesel
            });
        };

        dataStorageService.getRooms = function () {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/rooms'
            });
        };

        dataStorageService.getTreatments = function () {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/treatments'
            });
        };

        dataStorageService.getIcds = function () {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/icds'
            });
        };

        dataStorageService.saveTerms = function (terms) {
            return $http({
                method: 'POST',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending',
                data: terms
            });
        };

        dataStorageService.verifyCredentials = function (email) {
            return $http({
                method: 'GET',
                url: 'https://apex.oracle.com/pls/apex/pwr/webapp/verify/' + email
            });
        };

        return dataStorageService;
    }
})();
