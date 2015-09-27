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

            DataStorageService.getPatients = function () {
                return $http({
                    method: 'GET',
                    url: 'https://apex.oracle.com/pls/apex/pwr/webapp/patients'
                });
            };

            return DataStorageService;
        });