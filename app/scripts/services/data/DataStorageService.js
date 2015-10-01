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
                return $http({
                    method: "post",
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/',
                    data: employeeDetails
                });
            };

            DataStorageService.removeEmployee = function (employeeId) {
                return $http({
                    method: "delete",
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees/'  + employeeId
                });
            };

            DataStorageService.updateEmployeeDetails = function (employeeDetails) {
                return $http({
                    method: 'put',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/employees',
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
                    method: "post",
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients',
                    data: patientDetails
                });
            };

            DataStorageService.removePatient = function (patientPesel) {
                return $http({
                    method: "delete",
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients/' + patientPesel
                });
            };

            DataStorageService.updatePatientDetails = function (patientDetails) {
                return $http({
                    method: 'put',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients',
                    data: patientDetails
                });
            };
            
            return DataStorageService;
        });