angular.module('RehApp')

        .controller('TermsPendingController', function ($scope, $state, TermsDataService) {

            $scope.loadTermsPending = function () {
                $scope.loadingPending = true;
                TermsDataService.getTermsPending().then(
                        function (pendingTerms) {
                            if (pendingTerms.length === 0) {
                                $scope.loadingPending = false;
                                $state.go('root.terms.pending_empty');
                            }
                            else {
                                $scope.pendingTerms = pendingTerms;
                                $scope.loadingPending = false;
                            }
                        },
                        function () {
                            $scope.loadingPending = false;
                            $state.go('root.terms.pending_error');
                        }
                );
            };

            $scope.setChosen = function (term) {
                $scope.chosenTerm = term;
            };

            $scope.cancelTerm = function (patienttreatmentid) {
                $scope.cancelling = true;
                TermsDataService.cancelTerm(patienttreatmentid).then(function () {
                    $scope.loadTermsPending();
                    $scope.loadTermsCancelled();
                    $scope.cancelling = false;
                    $scope.errorCancel = false;
                }, function () {
                    $scope.cancelling = false;
                    $scope.errorCancel = true;
                });
            };


        });
