(function () {
    'use strict';

    angular.module('rehApp.patients.list', ['rehApp.patientsService', 'ui.router'])

            .controller('PatientsListController', PatientsListController);

    PatientsListController.$inject = ['$state', 'patientsService'];

    function PatientsListController($state, patientsService) {
        var vm = this;

        vm.errorRemove = false;
        vm.loading = false;
        vm.loadPatientsList = loadPatientsList;
        vm.removePatient = removePatient;
        vm.removing = false;
        vm.setChosen = setChosen;

        function loadPatientsList() {
            vm.loading = true;

            patientsService.getPatientsList()
                    .then(getPatientsListSuccess, getPatientsListFailure);

            function getPatientsListSuccess(patientsList) {
                if (patientsList.length === 0) {
                    $state.go('root.patients.list_empty');
                } else {
                    vm.patients = patientsList;
                    vm.loading = false;
                }
            }

            function getPatientsListFailure() {
                $state.go('root.patients.list_error');
            }
        }

        function removePatient() {
            vm.removing = true;
            vm.errorRemove = false;

            patientsService.removePatient(vm.chosenPatient.patientid)
                    .then(removePatientSuccess, removePatientFailure);

            function removePatientSuccess() {
                if (vm.patients.length - 1 === 0) {
                    $state.go('root.patients.list_empty');
                } else {
                    vm.removing = false;
                    vm.errorRemove = false;
                    vm.loadPatientsList();
                }
            }

            function removePatientFailure() {
                vm.removing = false;
                vm.errorRemove = true;
            }
        }

        function setChosen(patient) {
            vm.chosenPatient = patient;
        }
    }
})();
