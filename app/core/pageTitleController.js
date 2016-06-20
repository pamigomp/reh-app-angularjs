(function () {
    'use strict';

    angular.module('rehApp.pageTitle', [])

            .controller('PageTitleController', PageTitleController);

    PageTitleController.$inject = ['$state', 'APP_NAME'];

    function PageTitleController($state, APP_NAME) {
        var vm = this;

        vm.getPageTitle = getPageTitle;

        function getPageTitle() {
            var title = '';
            if (angular.isDefined($state.current.data) && angular.isDefined($state.current.data.title)) {
                title += $state.$current.data.title + ' - ';
            }
            title += APP_NAME;
            return title;
        }
    }
})();
