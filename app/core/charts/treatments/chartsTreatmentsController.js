(function () {
    'use strict';

    angular.module('rehApp.charts.treatments', ['chart.js'])

            .controller('ChartsTreatmentsController', ChartsTreatmentsController);

    ChartsTreatmentsController.$inject = [];

    function ChartsTreatmentsController() {
        var vm = this;

        vm.labels = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series = ['Series A'];
        vm.data = [
            [65, 59, 80, 81, 56, 55, 40, 40, 10, 60, 40, 20]
        ];

        vm.labels2 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series2 = ['mgr Paweł Pietrzak', 'Jan Kowalski', 'Andrzej Nowak'];
        vm.data2 = [
            [65, 59, 80, 81, 56, 55, 40, 40, 10, 60, 40, 20],
            [10, 20, 50, 30, 45, 20, 15, 40, 60, 10, 30, 30],
            [30, 50, 45, 30, 35, 30, 40, 35, 50, 20, 35, 40]
        ];

        vm.labels3 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series3 = ['KinesioTaping', 'Krioterapia', "Ultradźwięki"];
        vm.data3 = [
            [30, 20, 50, 40, 56, 55, 40, 40, 30, 20, 30, 40],
            [30, 50, 30, 30, 40, 30, 40, 55, 10, 20, 35, 40],
            [10, 20, 60, 30, 45, 30, 15, 40, 80, 50, 30, 30]

        ];

        vm.labels4 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        vm.series4 = ['NFZ', 'Prywatna'];
        vm.data4 = [
            [65, 59, 80, 81, 56, 55, 40, 40, 10, 60, 40, 20],
            [10, 20, 50, 30, 45, 20, 15, 40, 60, 10, 30, 30]
        ];
    }
})();
