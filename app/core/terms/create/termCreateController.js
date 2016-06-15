'use strict';

angular.module('rehApp.terms.create', ['rehApp.termsService'])

        .controller('TermCreateController', ['$scope', '$timeout', '$state', 'termsService', function ($scope, $timeout, $state, termsService) {
                $scope.termDetails = {};
                $scope.errorCreate = false;
                $scope.today = new Date().getTime();
                $scope.terms = [];
                $scope.index = 0;

                $scope.saveTerms = function () {
                    $scope.submitting = true;
                    for (var x in $scope.terms) {
                        termsService.saveTerms($scope.terms[x]).then(
                                function () {
                                    $scope.errorCreate = false;
                                    $scope.submitting = false;
                                }, function () {
                            $scope.errorCreate = true;
                            $scope.submitting = false;
                        });
                    }
                    $timeout(function () {
                        $state.go('root.terms.pending');
                    }, 2000);

                };

                $scope.saveTerm = function () {
                    $scope.terms[$scope.index] = angular.copy($scope.termDetails);
                    $scope.index += 1;
                };

                $scope.loadPatientsList = function () {
                    $scope.loadingPatients = true;
                    $scope.errorLoadingPatients = false;
                    termsService.getPatientsList().then(
                            function (patientsList) {
                                $scope.patientsList = patientsList;
                                $scope.loadingPatients = false;
                                $scope.errorLoadingPatients = false;
                            },
                            function () {
                                $scope.loadingPatients = false;
                                $scope.errorLoadingPatients = true;
                            }
                    );
                };

                $scope.loadIcdsList = function () {
                    $scope.loadingIcds = true;
                    $scope.errorLoadingIcds = false;
                    termsService.getIcdsList().then(
                            function (icdsList) {
                                $scope.icdsList = icdsList;
                                $scope.loadingIcds = false;
                                $scope.errorLoadingIcds = false;
                            },
                            function () {
                                $scope.loadingIcds = false;
                                $scope.errorLoadingIcds = true;
                            }
                    );
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
                //DATEPICKER
                $scope.minDate = new Date();
                $scope.maxDate = new Date();
                $scope.isOpen = false;
                $scope.isOpen2 = false;

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
                $scope.open2 = function ($event) {
                    if ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                    }

                    $scope.isOpen2 = true;
                };
                //DATEPICKER END

                //TIMEPICKER
                $scope.hstep = 1;
                $scope.mstep = 5;
                //TIMEPICKER END
            }]);
