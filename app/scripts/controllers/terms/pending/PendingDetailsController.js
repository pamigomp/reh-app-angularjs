'use strict';

angular.module('RehApp')

        .controller('PendingDetailsController', function ($scope, $state, $stateParams, TermsDataService) {
            $scope.allowEdit = false;
            $scope.defaultTermPendingDetails = {};
            
            $scope.loadTermPendingDetails = function () {
                $scope.loading = true;
                $scope.errorLoading = false;
                if (angular.isDefined($stateParams.termId)) {
                    TermsDataService.getTermPendingDetails($stateParams.termId).then(
                            function (termPendingDetails) {
                                $state.get('root.terms.pending.term').data.breadcrumb = termPendingDetails[0].surname + ' ' + termPendingDetails[0].name;
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

            $scope.updateTermPendingDetails = function () {
                $scope.updating = true;
                if (angular.isDefined($stateParams.termId)) {
                    TermsDataService.updateTermPendingDetails($scope.termPendingDetails).then(function () {
                        $scope.updating = false;
                        $scope.errorEdit = false;
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
        });
