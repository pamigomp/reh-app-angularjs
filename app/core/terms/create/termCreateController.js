/* jshint loopfunc:true */

(function () {
    'use strict';

    angular.module('rehApp.terms.create', ['rehApp.termsService', 'ui.router'])

            .controller('TermCreateController', TermCreateController);

    TermCreateController.$inject = ['$timeout', '$state', 'termsService'];

    function TermCreateController($timeout, $state, termsService) {
        var vm = this;

        vm.termDetails = {};
        vm.terms = [];
        vm.index = 0;
        vm.dateOptions = {
            startingDay: 1,
            minDate: new Date()
        };
        vm.dateOptions2 = {
            startingDay: 1,
            maxDate: new Date()
        };
        vm.hstep = 1;
        vm.mstep = 5;
        vm.open = open;
        vm.open2 = open2;
        vm.loadEmployeesList = loadEmployeesList;
        vm.loadIcdsList = loadIcdsList;
        vm.loadPatientsList = loadPatientsList;
        vm.loadRoomsList = loadRoomsList;
        vm.loadTreatmentsList = loadTreatmentsList;
        vm.saveTerm = saveTerm;
        vm.saveTerms = saveTerms;

        function saveTerms() {
            vm.errorCreate = false;
            vm.submitting = true;

            for (var i = 0; i < vm.terms.length; i++) {
                //TODO Move the function outside the loop
                termsService.saveTerms(vm.terms[i])
                        .then(saveTermsSuccess, saveTermsFailure);
            }

            //TODO Redirection need to be right after last response
            $timeout(function () {
                $state.go('root.terms.pending');
            }, 2000);

            function saveTermsSuccess() {
                vm.errorCreate = false;
                vm.submitting = false;
            }

            function saveTermsFailure() {
                vm.errorCreate = true;
                vm.submitting = false;
            }
        }

        function saveTerm() {
            vm.terms[vm.index] = angular.copy(vm.termDetails);
            vm.index += 1;
        }

        function loadPatientsList() {
            vm.errorLoadingPatients = false;
            vm.loadingPatients = true;

            termsService.getPatientsList()
                    .then(getPatientsListSuccess, getPatientsListFailure);

            function getPatientsListSuccess(patientsList) {
                vm.patientsList = patientsList;
                vm.errorLoadingPatients = false;
                vm.loadingPatients = false;
            }

            function getPatientsListFailure() {
                vm.errorLoadingPatients = true;
                vm.loadingPatients = false;
            }
        }

        function loadIcdsList() {
            vm.errorLoadingIcds = false;
            vm.loadingIcds = true;

            termsService.getIcdsList()
                    .then(getIcdsListSuccess, getIcdsListFailure);

            function getIcdsListSuccess(icdsList) {
                vm.icdsList = icdsList;
                vm.errorLoadingIcds = false;
                vm.loadingIcds = false;
            }

            function getIcdsListFailure() {
                vm.errorLoadingIcds = true;
                vm.loadingIcds = false;
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

        function open() {
            vm.opened = true;
        }


        function open2() {
            vm.opened2 = true;
        }
    }
})();
