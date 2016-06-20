(function () {
    'use strict';

    angular.module('rehApp.terms.pending.details', ['rehApp.termsService'])

            .controller('TermPendingDetailsController', TermPendingDetailsController);

    TermPendingDetailsController.$inject = ['$scope', '$state', '$stateParams', 'termsService'];

    function TermPendingDetailsController($scope, $state, $stateParams, termsService) {
        $scope.allowEdit = false;
        $scope.defaultTermPendingDetails = {};

        $scope.loadTermPendingDetails = function () {
            $scope.loading = true;
            $scope.errorLoading = false;
            if (angular.isDefined($stateParams.termId)) {
                termsService.getTermPendingDetails($stateParams.termId).then(
                        function (termPendingDetails) {
                            $state.get('root.terms.pending.term').data.breadcrumb = termPendingDetails[0].patienttreatmentid;
                            $scope.termPendingDetails = termPendingDetails[0];
                            $scope.saveDefaultTermPendingDetails();
                            $scope.loading = false;
                            $scope.errorLoading = false;
                        },
                        function () {
                            $scope.loading = false;
                            $scope.errorLoading = true;
                        }
                );
            }
        };

        $scope.loadEmployeesList = function () {
            $scope.loadingEmployees = true;
            $scope.errorLoadingEmployees = false;
            termsService.getEmployeesList().then(
                    function (employeesList) {
                        $scope.employeesList = employeesList;
                        $scope.loadingEmployees = false;
                        $scope.errorLoadingEmployees = false;
                    },
                    function () {
                        $scope.loadingEmployees = false;
                        $scope.errorLoadingEmployees = true;
                    }
            );
        };

        $scope.loadRoomsList = function () {
            $scope.loadingRooms = true;
            $scope.errorLoadingRooms = false;
            termsService.getRoomsList().then(
                    function (roomsList) {
                        $scope.roomsList = roomsList;
                        $scope.loadingRooms = false;
                        $scope.errorLoadingRooms = false;
                    },
                    function () {
                        $scope.loadingRooms = false;
                        $scope.errorLoadingRooms = true;
                    }
            );
        };

        $scope.loadTreatmentsList = function () {
            $scope.loadingTreatments = true;
            $scope.errorLoadingTreatments = false;
            termsService.getTreatmentsList().then(
                    function (treatmentsList) {
                        $scope.treatmentsList = treatmentsList;
                        $scope.loadingTreatments = false;
                        $scope.errorLoadingTreatments = false;
                    },
                    function () {
                        $scope.loadingTreatments = false;
                        $scope.errorLoadingTreatments = true;
                    }
            );
        };

        $scope.updateTermPendingDetails = function () {
            $scope.updating = true;
            if (angular.isDefined($stateParams.termId)) {
                termsService.updateTermPendingDetails($scope.termPendingDetails).then(function () {
                    $scope.updating = false;
                    $scope.errorEdit = false;
                    $scope.loadTermPendingDetails();
                }, function () {
                    $scope.updating = false;
                    $scope.errorEdit = true;
                });
            }
        };

        $scope.restoreTermPendingDetails = function () {
            angular.copy($scope.defaultTermPendingDetails, $scope.termPendingDetails);
        };

        $scope.saveDefaultTermPendingDetails = function () {
            angular.copy($scope.termPendingDetails, $scope.defaultTermPendingDetails);
        };

        //After clicking 'Edytuj' button, we would be able to make changes in the fields.
        $scope.startEdit = function () {
            $scope.allowEdit = true;
        };

        //After clicking 'Zapisz' button, we would not be able to make changes in the fields
        //and all changes are being saved.
        $scope.saveEdit = function () {
            $scope.allowEdit = false;
            $scope.updateTermPendingDetails();
        };

        //After clicking 'Anuluj' button, we would not be able to make changes in the fields
        //and all changes are being discarded (loading previous termPending's details).
        $scope.cancelEdit = function () {
            $scope.allowEdit = false;
            $scope.restoreTermPendingDetails();
        };

        //DATEPICKER
        $scope.minDate = new Date();
        $scope.isOpen = false;

        $scope.dateOptions = {
            'starting-day': 1
        };

        $scope.open = function ($event) {
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            }

            $scope.isOpen = true;
        };
        //DATEPICKER END

        //TIMEPICKER
        $scope.hstep = 1;
        $scope.mstep = 5;
        //TIMEPICKER END
    }
})();
