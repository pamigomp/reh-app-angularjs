(function () {
    'use strict';

    angular.module('rehApp.treatmentsService', ['rehApp.dataStorageService', 'ui.router'])

            .factory('treatmentsService', treatmentsService);

    treatmentsService.$inject = ['$q', '$state', 'dataStorageService'];

    function treatmentsService($q, $state, dataStorageService) {
        return {
            getTreatmentDetails: getTreatmentDetails,
            getTreatmentsList: getTreatmentsList,
            removeTreatment: removeTreatment,
            saveTreatmentDetails: saveTreatmentDetails,
            updateTreatmentDetails: updateTreatmentDetails
        };

        function getTreatmentsList() {
            var deferred = $q.defer();

            dataStorageService.getTreatments()
                    .then(getTreatmentsSuccess, getTreatmentsFailure);

            function getTreatmentsSuccess(treatmentsData) {
                var list = [];

                angular.forEach(treatmentsData.data.items, function (treatmentData) {
                    list.push(treatmentData);
                });

                deferred.resolve(list);
            }

            function getTreatmentsFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getTreatmentDetails(treatmentPesel) {
            var deferred = $q.defer();

            dataStorageService.getTreatment(treatmentPesel)
                    .then(getTreatmentSuccess, getTreatmentFailure);

            function getTreatmentSuccess(treatmentData) {
                deferred.resolve(treatmentData.data.items);
            }

            function getTreatmentFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function saveTreatmentDetails(treatmentDetails) {
            var deferred = $q.defer();

            dataStorageService.saveTreatment(treatmentDetails)
                    .then(saveTreatmentSuccess, saveTreatmentFailure);

            function saveTreatmentSuccess() {
                $state.go('root.treatments.list');
                deferred.resolve();
            }

            function saveTreatmentFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function removeTreatment(chosenTreatment) {
            var deferred = $q.defer();

            dataStorageService.removeTreatment(chosenTreatment)
                    .then(removeTreatmentSuccess, removeTreatmentFailure);

            function removeTreatmentSuccess() {
                deferred.resolve();
            }

            function removeTreatmentFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function updateTreatmentDetails(treatmentDetails) {
            var deferred = $q.defer();

            dataStorageService.updateTreatment(treatmentDetails)
                    .then(updateTreatmentSuccess, updateTreatmentFailure);

            function updateTreatmentSuccess() {
                deferred.resolve();
            }

            function updateTreatmentFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }
    }
})();
