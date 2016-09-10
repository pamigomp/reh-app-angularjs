(function () {
    'use strict';

    angular.module('rehApp.treatments.create', ['rehApp.treatmentsService'])

            .controller('TreatmentCreateController', TreatmentCreateController);

    TreatmentCreateController.$inject = ['treatmentsService'];

    function TreatmentCreateController(treatmentsService) {
        var vm = this;

        vm.treatmentDetails = {};
        vm.saveTreatmentDetails = saveTreatmentDetails;

        function saveTreatmentDetails() {
            vm.errorCreate = false;
            vm.submitting = true;
            treatmentsService.saveTreatmentDetails(vm.treatmentDetails)
                    .then(saveTreatmentDetailsSuccess, saveTreatmentDetailsFailure);

            function saveTreatmentDetailsSuccess() {
                vm.errorCreate = false;
                vm.submitting = false;
            }

            function saveTreatmentDetailsFailure() {
                vm.errorCreate = true;
                vm.submitting = false;
            }
        }
    }
})();
