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
        vm.statuses = [{'id': 'Aktywny', 'title': 'Aktywny'}, {'id': 'Nieaktywny', 'title': 'Nieaktywny'}];
        vm.tableParams = createTableParams();

        function createTableParams() {
            var initialParams = {
                count: 10,
                sorting: {surname: 'asc'}
            };
            var initialSettings = {
                counts: [10, 25, 50, 100],
                paginationMaxBlocks: 5,
                paginationMinBlocks: 1
            };
            return new NgTableParams(initialParams, initialSettings);
        }

        function loadPatientsList() {
            vm.loading = true;

            patientsService.getPatientsList()
                    .then(getPatientsListSuccess, getPatientsListFailure);

            function getPatientsListSuccess(patientsList) {
                if (patientsList.length === 0) {
                    $state.go('root.patients.list_empty');
                } else {
                    vm.tableParams.settings({dataset: patientsList});
                    vm.loading = false;
                }
            }

            function getPatientsListFailure() {
                $state.go('root.patients.list_error');
            }
        }

        function removePatient(pesel) {
            vm.removing = true;
            vm.errorRemove = false;

            patientsService.removePatient(pesel)
                    .then(removePatientSuccess, removePatientFailure);

            function removePatientSuccess() {
                if (vm.tableParams.total() - 1 === 0) {
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
