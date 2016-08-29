(function () {
    'use strict';

    angular.module('rehApp.patients.list', ['rehApp.patientsService', 'ui.router'])

            .controller('PatientsListController', PatientsListController);

    PatientsListController.$inject = ['$state', 'patientsService'];

    function PatientsListController($state, patientsService) {
        var vm = this;

        vm.loadPatientsList = function () {
            vm.loading = true;

            patientsService.getPatientsList().then(function (patientsList) {
                if (patientsList.length === 0) {
                    vm.loading = false;
                    $state.go('root.patients.list_empty');
                } else {
                    vm.patients = patientsList;
                    vm.loading = false;
                }
            }, function () {
                vm.loading = false;
                $state.go('root.patients.list_error');
            });
        };

        vm.removePatient = function () {
            vm.removing = true;
            vm.errorRemove = false;

            patientsService.removePatient(vm.chosenPatient.pesel).then(function () {
                if (vm.patients.length - 1 === 0) {
                    $state.go('root.patients.list_empty');
                } else {
                    vm.loadPatientsList();
                }
            }, function () {
                vm.removing = false;
                vm.errorRemove = true;
            });
        };

        vm.setChosen = function (patient) {
            vm.chosenPatient = patient;
        };
    }
})();
