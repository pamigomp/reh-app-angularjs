(function () {
    'use strict';

    angular.module('rehApp.terms.pending.list', ['rehApp.termsService'])

            .controller('TermsPendingListController', TermsPendingListController);

    TermsPendingListController.$inject = ['$scope', '$state', 'termsService'];

    function TermsPendingListController($scope, $state, termsService) {

        $scope.loadTermsPending = function () {
            $scope.loadingPending = true;
            termsService.getTermsPending().then(
                    function (pendingTerms) {
                        if (pendingTerms.length === 0) {
                            $scope.loadingPending = false;
                            $state.go('root.terms.pending_empty');
                        } else {
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
            termsService.cancelTerm(patienttreatmentid).then(function () {
                $scope.loadTermsPending();
                $scope.cancelling = false;
                $scope.errorCancel = false;
            }, function () {
                $scope.cancelling = false;
                $scope.errorCancel = true;
            });
        };

        $scope.completeTerm = function (patienttreatmentid) {
            $scope.completing = true;
            termsService.completeTerm(patienttreatmentid).then(function () {
                $scope.loadTermsPending();
                $scope.completing = false;
                $scope.errorComplete = false;
            }, function () {
                $scope.completing = false;
                $scope.errorComplete = true;
            });
        };
    }
})();
