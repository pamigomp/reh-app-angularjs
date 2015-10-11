'use strict';

angular.module('RehApp')
        .factory('DataStorageService', function ($http) {
            var DataStorageService = {};

            DataStorageService.getTermsPending = function () {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending'
                });
            };

            DataStorageService.getTermPending = function (termId) {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending/' + termId
                });
            };

            DataStorageService.updateTermPending = function (termPendingDetails) {
                return $http({
                    method: 'PUT',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/pending/' + termPendingDetails.patienttreatmentid,
                    data: termPendingDetails
                });
            };

            DataStorageService.getTermsCancelled = function () {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/cancelled'
                });
            };

            DataStorageService.getTermsCompleted = function () {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/completed'
                });
            };

            DataStorageService.cancelTerm = function (patienttreatmentid) {
                return $http({
                    method: 'PUT',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/cancel/' + patienttreatmentid
                });
            };

            DataStorageService.completeTerm = function (patienttreatmentid) {
                return $http({
                    method: 'PUT',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/terms/complete/' + patienttreatmentid
                });
            };

            DataStorageService.getEmployees = function () {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees'
                });
            };

            DataStorageService.getEmployee = function (employeeId) {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeId
                });
            };

            DataStorageService.saveEmployee = function (employeeDetails) {
                return $http({
                    method: "POST",
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees',
                    data: employeeDetails
                });
            };

            DataStorageService.removeEmployee = function (employeeId) {
                return $http({
                    method: "DELETE",
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeId
                });
            };

            DataStorageService.updateEmployee = function (employeeDetails) {
                return $http({
                    method: 'PUT',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeDetails.employeeid,
                    data: employeeDetails
                });
            };

            DataStorageService.getEmployeeTermsPending = function (employeeId) {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/pending/' + employeeId
                });
            };

            DataStorageService.getEmployeeTermsCompleted = function (employeeId) {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/completed/' + employeeId
                });
            };

            DataStorageService.getEmployeeTermsCancelled = function (employeeId) {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/cancelled/' + employeeId
                });
            };

            DataStorageService.getPatients = function () {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients'
                });
            };

            DataStorageService.getPatient = function (patientPesel) {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientPesel
                });
            };

            DataStorageService.savePatient = function (patientDetails) {
                return $http({
                    method: "POST",
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients',
                    data: patientDetails
                });
            };

            DataStorageService.removePatient = function (patientPesel) {
                return $http({
                    method: "DELETE",
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientPesel
                });
            };

            DataStorageService.updatePatient = function (patientDetails) {
                return $http({
                    method: 'PUT',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientDetails.pesel,
                    data: patientDetails
                });
            };

            DataStorageService.resetPatientPassword = function (patientPesel) {
                return $http({
                    method: 'PUT',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/passwords/' + patientPesel
                });
            };

            DataStorageService.getPatientTermsPending = function (patientPesel) {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/pending/' + patientPesel
                });
            };

            DataStorageService.getPatientTermsCompleted = function (patientPesel) {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/completed/' + patientPesel
                });
            };

            DataStorageService.getPatientTermsCancelled = function (patientPesel) {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/cancelled/' + patientPesel
                });
            };

            DataStorageService.getRooms = function () {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/rooms'
                });
            };

            DataStorageService.getTreatments = function () {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/treatments'
                });
            };
            return DataStorageService;
        });