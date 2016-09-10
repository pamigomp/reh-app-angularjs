(function () {
    'use strict';

    angular.module('rehApp.treatments.list', ['rehApp.treatmentsService', 'ui.router', 'ngTable'])

            .controller('TreatmentsListController', TreatmentsListController);

    TreatmentsListController.$inject = ['$state', 'treatmentsService', 'NgTableParams'];

    function TreatmentsListController($state, treatmentsService, NgTableParams) {
        var vm = this;

        vm.loadTreatmentsList = loadTreatmentsList;
        vm.removeTreatment = removeTreatment;
        vm.setChosen = setChosen;
        vm.tableParams = createTableParams();

        function createTableParams() {
            var initialParams = {
                count: 10,
                sorting: {kindoftreatment: 'asc'}
            };
            var initialSettings = {
                counts: [10, 25, 50, 100],
                paginationMaxBlocks: 5,
                paginationMinBlocks: 1
            };
            return new NgTableParams(initialParams, initialSettings);
        }

        function loadTreatmentsList() {
            vm.loading = true;

            treatmentsService.getTreatmentsList()
                    .then(getTreatmentsListSuccess, getTreatmentsListFailure);

            function getTreatmentsListSuccess(treatmentsList) {
                if (treatmentsList.length === 0) {
                    $state.go('root.treatments.list_empty');
                } else {
                    vm.tableParams.settings({dataset: treatmentsList});
                    vm.loading = false;
                }
            }

            function getTreatmentsListFailure() {
                $state.go('root.treatments.list_error');
            }
        }

        function removeTreatment(treatmentId) {
            vm.removing = true;
            vm.errorRemove = false;

            treatmentsService.removeTreatment(treatmentId)
                    .then(removeTreatmentSuccess, removeTreatmentFailure);

            function removeTreatmentSuccess() {
                if (vm.tableParams.total() - 1 === 0) {
                    $state.go('root.treatments.list_empty');
                } else {
                    vm.removing = false;
                    vm.errorRemove = false;
                    vm.loadTreatmentsList();
                }
            }

            function removeTreatmentFailure() {
                vm.removing = false;
                vm.errorRemove = true;
            }
        }

        function setChosen(treatment) {
            vm.chosenTreatment = treatment;
        }
    }
})();
