(function () {
    'use strict';

    angular.module('rehApp.charts.patients', ['chart.js'])

            .controller('ChartsPatientsController', ChartsPatientsController);

    ChartsPatientsController.$inject = [];

    function ChartsPatientsController() {
        var vm = this;

        vm.labels = ['Kobiety', 'Mężczyźni'];
        vm.data = [300, 500];

        vm.labels2 = ['0-25', '26-50', '51-75', '76+'];
        vm.data2 = [130, 250, 350, 70];

        vm.labels3 = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        vm.series3 = ['Series A'];
        vm.data3 = [
            [65, 59, 80, 81, 56, 55, 40, 40, 10, 60, 40, 20]
        ];
    }
})();
