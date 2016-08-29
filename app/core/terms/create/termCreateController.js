/* jshint loopfunc:true */

(function () {
    'use strict';

    angular.module('rehApp.terms.create', ['rehApp.termsService', 'ui.router'])

            .controller('TermCreateController', TermCreateController);

    TermCreateController.$inject = ['$timeout', '$state', 'termsService'];

    function TermCreateController($timeout, $state, termsService) {
        var vm = this;

        vm.termDetails = {};
        vm.errorCreate = false;
        vm.today = new Date().getTime();
        vm.terms = [];
        vm.index = 0;

        vm.saveTerms = function () {
            vm.submitting = true;
            for (var i = 0; i < vm.terms.length; i++) {
                //TODO Move the function outside the loop
                termsService.saveTerms(vm.terms[i]).then(
                        function () {
                            vm.errorCreate = false;
                            vm.submitting = false;
                        }, function () {
                    vm.errorCreate = true;
                    vm.submitting = false;
                });
            }
            $timeout(function () {
                $state.go('root.terms.pending');
            }, 2000);

        };

        vm.saveTerm = function () {
            vm.terms[vm.index] = angular.copy(vm.termDetails);
            vm.index += 1;
        };

        vm.loadPatientsList = function () {
            vm.loadingPatients = true;
            vm.errorLoadingPatients = false;
            termsService.getPatientsList().then(
                    function (patientsList) {
                        vm.patientsList = patientsList;
                        vm.loadingPatients = false;
                        vm.errorLoadingPatients = false;
                    },
                    function () {
                        vm.loadingPatients = false;
                        vm.errorLoadingPatients = true;
                    }
            );
        };

        vm.loadIcdsList = function () {
            vm.loadingIcds = true;
            vm.errorLoadingIcds = false;
            termsService.getIcdsList().then(
                    function (icdsList) {
                        vm.icdsList = icdsList;
                        vm.loadingIcds = false;
                        vm.errorLoadingIcds = false;
                    },
                    function () {
                        vm.loadingIcds = false;
                        vm.errorLoadingIcds = true;
                    }
            );
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
        //DATEPICKER
        vm.minDate = new Date();
        vm.maxDate = new Date();
        vm.isOpen = false;
        vm.isOpen2 = false;

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
        vm.open2 = function ($event) {
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            }

            vm.isOpen2 = true;
        };
        //DATEPICKER END

        //TIMEPICKER
        vm.hstep = 1;
        vm.mstep = 5;
        //TIMEPICKER END
    }
})();
