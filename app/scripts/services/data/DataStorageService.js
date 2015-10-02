'use strict';

angular.module('RehApp')
        .factory('DataStorageService', function ($http) {
            var DataStorageService = {};

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
                console.log(employeeDetails);
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
                console.log(employeeDetails);
                return $http({
                    method: 'PUT',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/' + employeeDetails.employeeid,
                    data: employeeDetails
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
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/password/' + patientPesel
                });
            };

            return DataStorageService;
        });