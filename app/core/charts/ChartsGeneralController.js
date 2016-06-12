'use strict';

angular.module('rehApp')

        .controller('ChartsGeneralController', function ($scope) {
            $scope.labels = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series = ['Series A'];
            $scope.data = [
                [6500, 5900, 8000, 8100, 5600, 5500, 4000, 4000, 1000, 6000, 4000, 2000]
            ];

            $scope.labels2 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series2 = ['mgr Paweł Pietrzak', 'Jan Kowalski', 'Andrzej Nowak'];
            $scope.data2 = [
                [650, 590, 800, 810, 560, 550, 400, 400, 100, 600, 400, 200],
                [100, 200, 500, 300, 450, 200, 150, 400, 600, 100, 300, 300],
                [300, 500, 450, 300, 350, 300, 400, 350, 500, 200, 350, 400]
            ];

            $scope.labels3 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series3 = ['KinesioTaping', 'Krioterapia', "Ultradźwięki"];
            $scope.data3 = [
                [300, 200, 500, 400, 560, 550, 400, 400, 300, 200, 300, 400],
                [300, 500, 300, 300, 400, 300, 400, 550, 100, 200, 350, 400],
                [100, 200, 600, 300, 450, 300, 150, 400, 800, 500, 300, 300]

            ];

            $scope.labels4 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series4 = ['Series A'];
            $scope.data4 = [
                [350, 500, 600, 400, 700, 600, 550, 400, 475, 400, 600, 550]
            ];
        });
