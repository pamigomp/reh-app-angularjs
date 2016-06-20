(function () {
    'use strict';

    angular.module('rehApp.terms.completed.list', ['rehApp.termsService'])

            .controller('TermsCompletedListController', TermsCompletedListController);

    TermsCompletedListController.$inject = ['$scope', '$state', 'termsService'];

    function TermsCompletedListController($scope, $state, termsService) {

        $scope.loadTermsCompleted = function () {
            $scope.loadingCompleted = true;
            termsService.getTermsCompleted().then(
                    function (completedTerms) {
                        if (completedTerms.length === 0) {
                            $scope.loadingCompleted = false;
                            $state.go('root.terms.completed_empty');
                        } else {
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
    }
})();
