(function () {
    'use strict';

    angular.module('rehApp.terms.pending.details', ['rehApp.termsService', 'ui.router'])

            .controller('TermPendingDetailsController', TermPendingDetailsController);

    TermPendingDetailsController.$inject = ['$state', '$stateParams', 'termsService'];

    function TermPendingDetailsController($state, $stateParams, termsService) {
        var vm = this;

        vm.allowEdit = false;
        vm.defaultTermPendingDetails = {};

        vm.loadTermPendingDetails = function () {
            vm.loading = true;
            vm.errorLoading = false;
            if (angular.isDefined($stateParams.termId)) {
                termsService.getTermPendingDetails($stateParams.termId).then(
                        function (termPendingDetails) {
                            $state.get('root.terms.pending.term').data.breadcrumb = termPendingDetails[0].patienttreatmentid;
                            vm.termPendingDetails = termPendingDetails[0];
                            vm.saveDefaultTermPendingDetails();
                            vm.loading = false;
                            vm.errorLoading = false;
                        },
                        function () {
                            vm.loading = false;
                            vm.errorLoading = true;
                        }
                );
            }
        };

        vm.loadEmployeesList = function () {
            vm.loadingEmployees = true;
            vm.errorLoadingEmployees = false;
            termsService.getEmployeesList().then(
                    function (employeesList) {
                        vm.employeesList = employeesList;
                        vm.loadingEmployees = false;
                        vm.errorLoadingEmployees = false;
                    },
                    function () {
                        vm.loadingEmployees = false;
                        vm.errorLoadingEmployees = true;
                    }
            );
        };

        vm.loadRoomsList = function () {
            vm.loadingRooms = true;
            vm.errorLoadingRooms = false;
            termsService.getRoomsList().then(
                    function (roomsList) {
                        vm.roomsList = roomsList;
                        vm.loadingRooms = false;
                        vm.errorLoadingRooms = false;
                    },
                    function () {
                        vm.loadingRooms = false;
                        vm.errorLoadingRooms = true;
                    }
            );
        };

        vm.loadTreatmentsList = function () {
            vm.loadingTreatments = true;
            vm.errorLoadingTreatments = false;
            termsService.getTreatmentsList().then(
                    function (treatmentsList) {
                        vm.treatmentsList = treatmentsList;
                        vm.loadingTreatments = false;
                        vm.errorLoadingTreatments = false;
                    },
                    function () {
                        vm.loadingTreatments = false;
                        vm.errorLoadingTreatments = true;
                    }
            );
        };

        vm.updateTermPendingDetails = function () {
            vm.updating = true;
            if (angular.isDefined($stateParams.termId)) {
                termsService.updateTermPendingDetails(vm.termPendingDetails).then(function () {
                    vm.updating = false;
                    vm.errorEdit = false;
                    vm.loadTermPendingDetails();
                }, function () {
                    vm.updating = false;
                    vm.errorEdit = true;
                });
            }
        };

        vm.restoreTermPendingDetails = function () {
            angular.copy(vm.defaultTermPendingDetails, vm.termPendingDetails);
        };

        vm.saveDefaultTermPendingDetails = function () {
            angular.copy(vm.termPendingDetails, vm.defaultTermPendingDetails);
        };

        //After clicking 'Edytuj' button, we would be able to make changes in the fields.
        vm.startEdit = function () {
            vm.allowEdit = true;
        };

        //After clicking 'Zapisz' button, we would not be able to make changes in the fields
        //and all changes are being saved.
        vm.saveEdit = function () {
            vm.allowEdit = false;
            vm.updateTermPendingDetails();
        };

        //After clicking 'Anuluj' button, we would not be able to make changes in the fields
        //and all changes are being discarded (loading previous termPending's details).
        vm.cancelEdit = function () {
            vm.allowEdit = false;
            vm.restoreTermPendingDetails();
        };

        //DATEPICKER
        vm.minDate = new Date();
        vm.isOpen = false;

        vm.dateOptions = {
            'starting-day': 1
        };

        vm.open = function ($event) {
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            }

            vm.isOpen = true;
        };
        //DATEPICKER END

        //TIMEPICKER
        vm.hstep = 1;
        vm.mstep = 5;
        //TIMEPICKER END
    }
})();
