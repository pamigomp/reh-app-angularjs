angular.module('rehApp')

        .controller('TermsCancelledController', function ($scope, $state, TermsDataService) {

            $scope.loadTermsCancelled = function () {
                $scope.loadingCancelled = true;
                TermsDataService.getTermsCancelled().then(
                        function (cancelledTerms) {
                            if (cancelledTerms.length === 0) {
                                $scope.loadingCancelled = false;
                                $state.go('root.terms.cancelled_empty');
                            }
                            else {
                                $scope.cancelledTerms = cancelledTerms;
                                $scope.loadingCancelled = false;
                            }
                        },
                        function () {
                            $scope.loadingCancelled = false;
                            $state.go('root.terms.cancelled_error');
                        }
                );
            };
        });
