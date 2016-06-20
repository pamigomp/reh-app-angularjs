(function () {
    'use strict';

    angular.module('rehApp.terms.cancelled.list', ['rehApp.termsService'])

            .controller('TermsCancelledListController', TermsCancelledListController);

    TermsCancelledListController.$inject = ['$scope', '$state', 'termsService'];

    function TermsCancelledListController($scope, $state, termsService) {

        $scope.loadTermsCancelled = function () {
            $scope.loadingCancelled = true;
            termsService.getTermsCancelled().then(
                    function (cancelledTerms) {
                        if (cancelledTerms.length === 0) {
                            $scope.loadingCancelled = false;
                            $state.go('root.terms.cancelled_empty');
                        } else {
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
    }
})();
