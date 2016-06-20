(function () {
    'use strict';

    angular.module('rehApp.charts.general', ['chart.js'])

            .controller('ChartsGeneralController', ChartsGeneralController);

    ChartsGeneralController.$inject = [];

    function ChartsGeneralController() {
        var vm = this;

        vm.labels = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series = ['Series A'];
        vm.data = [
            [6500, 5900, 8000, 8100, 5600, 5500, 4000, 4000, 1000, 6000, 4000, 2000]
        ];

        vm.labels2 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series2 = ['mgr Paweł Pietrzak', 'Jan Kowalski', 'Andrzej Nowak'];
        vm.data2 = [
            [650, 590, 800, 810, 560, 550, 400, 400, 100, 600, 400, 200],
            [100, 200, 500, 300, 450, 200, 150, 400, 600, 100, 300, 300],
            [300, 500, 450, 300, 350, 300, 400, 350, 500, 200, 350, 400]
        ];

        vm.labels3 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series3 = ['KinesioTaping', 'Krioterapia', "Ultradźwięki"];
        vm.data3 = [
            [300, 200, 500, 400, 560, 550, 400, 400, 300, 200, 300, 400],
            [300, 500, 300, 300, 400, 300, 400, 550, 100, 200, 350, 400],
            [100, 200, 600, 300, 450, 300, 150, 400, 800, 500, 300, 300]

        ];

        vm.labels4 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series4 = ['Series A'];
        vm.data4 = [
            [350, 500, 600, 400, 700, 600, 550, 400, 475, 400, 600, 550]
        ];
    }
})();
