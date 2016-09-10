(function () {
    'use strict';

    angular.module('rehApp.treatments.details', ['rehApp.treatmentsService', 'ui.router'])

            .controller('TreatmentDetailsController', TreatmentDetailsController);

    TreatmentDetailsController.$inject = ['$state', '$stateParams', 'treatmentsService'];

    function TreatmentDetailsController($state, $stateParams, treatmentsService) {
        var vm = this;

        vm.allowEdit = false;
        vm.cancelEdit = cancelEdit;
        vm.defaultTreatmentDetails = {};
        vm.employeeDetails = {};
        vm.loadTreatmentDetails = loadTreatmentDetails;
        vm.startEdit = startEdit;
        vm.updateTreatmentDetails = updateTreatmentDetails;

        function cancelEdit() {
            vm.allowEdit = false;
            restoreTreatmentDetails();
        }

        function loadTreatmentDetails() {
            vm.errorLoading = false;
            vm.loading = true;

            if (angular.isDefined($stateParams.treatmentId)) {
                treatmentsService.getTreatmentDetails($stateParams.treatmentId)
                        .then(getTreatmentDetailsSuccess, getTreatmentDetailsFailure);
            }

            function getTreatmentDetailsSuccess(treatmentDetails) {
                $state.get('root.treatments.treatment').data.breadcrumb = treatmentDetails[0].kindoftreatment;
                vm.treatmentDetails = treatmentDetails[0];
                saveDefaultTreatmentDetails();
                vm.errorLoading = false;
                vm.loading = false;
            }

            function getTreatmentDetailsFailure() {
                vm.errorLoading = true;
                vm.loading = false;
            }
        }

        function restoreTreatmentDetails() {
            angular.copy(vm.defaultTreatmentDetails, vm.treatmentDetails);
        }

        function saveDefaultTreatmentDetails() {
            angular.copy(vm.treatmentDetails, vm.defaultTreatmentDetails);
        }

        function startEdit() {
            vm.allowEdit = true;
        }

        function updateTreatmentDetails() {
            vm.errorEdit = false;
            vm.updating = true;

            if (angular.isDefined($stateParams.treatmentId)) {
                treatmentsService.updateTreatmentDetails(vm.treatmentDetails)
                        .then(updateTreatmentDetailsSuccess, updateTreatmentDetailsFailure);
            }

            function updateTreatmentDetailsSuccess() {
                saveDefaultTreatmentDetails();
                vm.allowEdit = false;
                vm.errorEdit = false;
                vm.updating = false;
            }

            function updateTreatmentDetailsFailure() {
                vm.errorEdit = true;
                vm.updating = false;
            }
        }
    }
})();
