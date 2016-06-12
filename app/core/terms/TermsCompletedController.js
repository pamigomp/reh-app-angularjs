angular.module('rehApp')

        .controller('TermsCompletedController', function ($scope, $state, TermsDataService) {

            $scope.loadTermsCompleted = function () {
                $scope.loadingCompleted = true;
                TermsDataService.getTermsCompleted().then(
                        function (completedTerms) {
                            if (completedTerms.length === 0) {
                                $scope.loadingCompleted = false;
                                $state.go('root.terms.completed_empty');
                            }
                            else {
                                $scope.completedTerms = completedTerms;
                                $scope.loadingCompleted = false;
                            }
                        },
                        function () {
                            $scope.loadingCompleted = false;
                            $state.go('root.terms.completed_error');
                        }
                );
            };
        });
