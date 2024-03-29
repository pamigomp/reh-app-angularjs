(function () {
    'use strict';

    angular.module('rehApp.employeesService', ['rehApp.dataStorageService', 'ui.router'])

            .factory('employeesService', employeesService);

    employeesService.$inject = ['$q', '$state', 'dataStorageService'];

    function employeesService($q, $state, dataStorageService) {
        return {
            cancelEmployeeTerm: cancelEmployeeTerm,
            completeEmployeeTerm: completeEmployeeTerm,
            getEmployeeDetails: getEmployeeDetails,
            getEmployeesList: getEmployeesList,
            getEmployeeTermsPending: getEmployeeTermsPending,
            getEmployeeTermsCancelled: getEmployeeTermsCancelled,
            getEmployeeTermsCompleted: getEmployeeTermsCompleted,
            getKindsOfTreatment: getKindsOfTreatment,
            removeEmployee: removeEmployee,
            saveEmployeeDetails: saveEmployeeDetails,
            updateEmployeeDetails: updateEmployeeDetails
        };

        function getKindsOfTreatment() {
            var deferred = $q.defer();

            dataStorageService.getTreatments()
                    .then(getTreatmentsSuccess, getTreatmentsFailure);

            function getTreatmentsSuccess(treatmentData) {
                for (var i = 0; i < treatmentData.data.items.length; i++) {
                    if (treatmentData.data.items[i].hasOwnProperty('kindoftreatment')) {
                        treatmentData.data.items[i].title = treatmentData.data.items[i].kindoftreatment;
                        treatmentData.data.items[i].id = treatmentData.data.items[i].kindoftreatment;
                        delete treatmentData.data.items[i].kindoftreatment;
                        delete treatmentData.data.items[i].duration;
                        delete treatmentData.data.items[i].price;
                        delete treatmentData.data.items[i].treatmentid;
                    }
                }

                deferred.resolve(treatmentData.data.items);
            }

            function getTreatmentsFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getEmployeesList() {
            var deferred = $q.defer();

            dataStorageService.getEmployees()
                    .then(getEmployeesSuccess, getEmployeesFailure);

            function getEmployeesSuccess(employeesData) {
                var list = [];

                angular.forEach(employeesData.data.items, function (employeeData) {
                    list.push(employeeData);
                });

                deferred.resolve(list);
            }

            function getEmployeesFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getEmployeeDetails(employeeId) {
            var deferred = $q.defer();

            dataStorageService.getEmployee(employeeId)
                    .then(getEmployeeSucess, getEmployeeFailure);

            function getEmployeeSucess(employeeData) {
                deferred.resolve(employeeData.data.items);
            }

            function getEmployeeFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function saveEmployeeDetails(employeeDetails) {
            var deferred = $q.defer();

            dataStorageService.saveEmployee(employeeDetails)
                    .then(saveEmployeeSuccess, saveEmployeeFailure);

            function saveEmployeeSuccess() {
                $state.go('root.employees.list');
                deferred.resolve();
            }

            function saveEmployeeFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function removeEmployee(chosenEmployee) {
            var deferred = $q.defer();

            dataStorageService.removeEmployee(chosenEmployee)
                    .then(removeEmployeeSuccess, removeEmployeeFailure);

            function removeEmployeeSuccess() {
                deferred.resolve();
            }

            function removeEmployeeFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function updateEmployeeDetails(employeeDetails) {
            var deferred = $q.defer();

            dataStorageService.updateEmployee(employeeDetails)
                    .then(updateEmployeeSuccess, updateEmployeeFailure);

            function updateEmployeeSuccess() {
                deferred.resolve();
            }

            function updateEmployeeFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getEmployeeTermsPending(employeeId) {
            var deferred = $q.defer();

            dataStorageService.getEmployeeTermsPending(employeeId)
                    .then(getEmployeeTermsPendingSuccess, getEmployeeTermsPendingFailure);

            function getEmployeeTermsPendingSuccess(employeeData) {
                deferred.resolve(employeeData.data.items);
            }

            function getEmployeeTermsPendingFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getEmployeeTermsCancelled(employeeId) {
            var deferred = $q.defer();

            dataStorageService.getEmployeeTermsCancelled(employeeId)
                    .then(getEmployeeTermsCancelledSuccess, getEmployeeTermsCancelledFailure);

            function getEmployeeTermsCancelledSuccess(employeeData) {
                deferred.resolve(employeeData.data.items);
            }

            function getEmployeeTermsCancelledFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getEmployeeTermsCompleted(employeeId) {
            var deferred = $q.defer();

            dataStorageService.getEmployeeTermsCompleted(employeeId)
                    .then(getEmployeeTermsCompletedSuccess, getEmployeeTermsCompletedFailure);

            function getEmployeeTermsCompletedSuccess(employeeData) {
                deferred.resolve(employeeData.data.items);
            }

            function getEmployeeTermsCompletedFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function cancelEmployeeTerm(patienttreatmentid) {
            var deferred = $q.defer();

            dataStorageService.cancelTerm(patienttreatmentid)
                    .then(cancelTermSuccess, cancelTermFailure);

            function cancelTermSuccess() {
                deferred.resolve();
            }

            function cancelTermFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }

        function completeEmployeeTerm(patienttreatmentid) {
            var deferred = $q.defer();

            dataStorageService.completeTerm(patienttreatmentid)
                    .then(completeTermSuccess, completeTermFailure);

            function completeTermSuccess() {
                deferred.resolve();
            }

            function completeTermFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }
    }
})();
