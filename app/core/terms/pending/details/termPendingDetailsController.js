(function () {
    'use strict';

    angular.module('rehApp.terms.pending.details', ['rehApp.termsService', 'ui.router'])

            .controller('TermPendingDetailsController', TermPendingDetailsController);

    TermPendingDetailsController.$inject = ['$state', '$stateParams', 'termsService'];

    function TermPendingDetailsController($state, $stateParams, termsService) {
        var vm = this;

        vm.allowEdit = false;
        vm.cancelEdit = cancelEdit;
        vm.dateOptions = {
            startingDay: 1,
            minDate: new Date()
        };
        vm.defaultTermPendingDetails = {};
        vm.hstep = 1;
        vm.loadEmployeesList = loadEmployeesList;
        vm.loadRoomsList = loadRoomsList;
        vm.loadTermPendingDetails = loadTermPendingDetails;
        vm.loadTreatmentsList = loadTreatmentsList;
        vm.mstep = 5;
        vm.open = open;
        vm.startEdit = startEdit;
        vm.updateTermPendingDetails = updateTermPendingDetails;

        function loadTermPendingDetails() {
            vm.errorLoading = false;
            vm.loading = true;

            if (angular.isDefined($stateParams.termId)) {
                termsService.getTermPendingDetails($stateParams.termId)
                        .then(getTermPendingDetailsSuccess, getTermPendingDetailsFailure);
            }

            function getTermPendingDetailsSuccess(termPendingDetails) {
                $state.get('root.terms.pending.term').data.breadcrumb = termPendingDetails[0].patienttreatmentid;
                vm.termPendingDetails = termPendingDetails[0];
                vm.termPendingDetails.datehour = new Date(vm.termPendingDetails.datehour);
                saveDefaultTermPendingDetails();
                vm.errorLoading = false;
                vm.loading = false;
            }

            function getTermPendingDetailsFailure() {
                vm.errorLoading = true;
                vm.loading = false;
            }
        }

        function loadEmployeesList() {
            vm.errorLoadingEmployees = false;
            vm.loadingEmployees = true;

            termsService.getEmployeesList()
                    .then(getEmployeesListSuccess, getEmployeesListFailure);

            function getEmployeesListSuccess(employeesList) {
                vm.employeesList = employeesList;
                vm.errorLoadingEmployees = false;
                vm.loadingEmployees = false;
            }

            function getEmployeesListFailure() {
                vm.errorLoadingEmployees = true;
                vm.loadingEmployees = false;
            }
        }

        function loadRoomsList() {
            vm.errorLoadingRooms = false;
            vm.loadingRooms = true;

            termsService.getRoomsList()
                    .then(getRoomsListSuccess, getRoomsListFailure);

            function getRoomsListSuccess(roomsList) {
                vm.roomsList = roomsList;
                vm.errorLoadingRooms = false;
                vm.loadingRooms = false;
            }

            function getRoomsListFailure() {
                vm.errorLoadingRooms = true;
                vm.loadingRooms = false;
            }
        }

        function loadTreatmentsList() {
            vm.errorLoadingTreatments = false;
            vm.loadingTreatments = true;

            termsService.getTreatmentsList()
                    .then(getTreatmentsListSuccess, getTreatmentsListFailure);

            function getTreatmentsListSuccess(treatmentsList) {
                vm.treatmentsList = treatmentsList;
                vm.errorLoadingTreatments = false;
                vm.loadingTreatments = false;
            }

            function getTreatmentsListFailure() {
                vm.errorLoadingTreatments = true;
                vm.loadingTreatments = false;
            }
        }

        function updateTermPendingDetails() {
            vm.errorEdit = false;
            vm.updating = true;

            if (angular.isDefined($stateParams.termId)) {
                termsService.updateTermPendingDetails(vm.termPendingDetails)
                        .then(updateTermPendingDetailsSuccess, updateTermPendingDetailsFailure);
            }

            function updateTermPendingDetailsSuccess() {
                saveDefaultTermPendingDetails();
                vm.allowEdit = false;
                vm.errorEdit = false;
                vm.updating = false;
            }

            function updateTermPendingDetailsFailure() {
                vm.errorEdit = true;
                vm.updating = false;
            }
        }

        function restoreTermPendingDetails() {
            angular.copy(vm.defaultTermPendingDetails, vm.termPendingDetails);
        }

        function saveDefaultTermPendingDetails() {
            angular.copy(vm.termPendingDetails, vm.defaultTermPendingDetails);
        }

        function startEdit() {
            vm.allowEdit = true;
        }

        function cancelEdit() {
            vm.allowEdit = false;
            restoreTermPendingDetails();
        }

        function open() {
            vm.opened = true;
        }
    }
})();
