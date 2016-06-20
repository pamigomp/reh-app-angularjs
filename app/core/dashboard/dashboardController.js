(function () {
    'use strict';

    angular.module('rehApp.dashboard', ['chart.js'])

            .controller('DashboardController', DashboardController);

    DashboardController.$inject = [];

    function DashboardController() {
        var vm = this;

        vm.labels = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series = ['Series A'];
        vm.data = [
            [6500, 5900, 8000, 8100, 5600, 5500, 4000, 4000, 1000, 6000, 4000, 2000]
        ];

        vm.labels2 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series2 = ['Series A'];
        vm.data2 = [
            [350, 500, 600, 400, 700, 600, 550, 400, 475, 400, 600, 550]
        ];
    }
})();
