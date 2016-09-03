(function () {
    'use strict';

    angular.module('rehApp.patients.list', ['rehApp.patientsService', 'ui.router', 'ngTable'])

            .controller('PatientsListController', PatientsListController);

    PatientsListController.$inject = ['$state', 'patientsService', 'NgTableParams'];

    function PatientsListController($state, patientsService, NgTableParams) {
        var vm = this;

        vm.loadPatientsList = loadPatientsList;
        vm.removePatient = removePatient;
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
                    vm.tableParams = new NgTableParams({}, {dataset: vm.patients});
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

            patientsService.removePatient(vm.chosenPatient.pesel)
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
