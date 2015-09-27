'use strict';

angular.module('RehApp')

        .factory('PatientsDataService', function ($q, DataStorageService) {
            var PatientsDataService = {};

            PatientsDataService.getPatientsList = function () {
                var deferred = $q.defer();

                DataStorageService.getPatients().then(
                        function (patientsData) {
                            var list = [];
                            angular.forEach(patientsData.data.items, function (patientData) {
                                list.push(patientData);
                            });
                            deferred.resolve(list);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };
            
            return PatientsDataService;
        });
        