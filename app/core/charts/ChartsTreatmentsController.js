'use strict';

angular.module('rehApp')

        .controller('ChartsTreatmentsController', function ($scope) {
            $scope.labels = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series = ['Series A'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40, 40, 10, 60, 40, 20]
            ];

            $scope.labels2 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series2 = ['mgr Paweł Pietrzak', 'Jan Kowalski', 'Andrzej Nowak'];
            $scope.data2 = [
                [65, 59, 80, 81, 56, 55, 40, 40, 10, 60, 40, 20],
                [10, 20, 50, 30, 45, 20, 15, 40, 60, 10, 30, 30],
                [30, 50, 45, 30, 35, 30, 40, 35, 50, 20, 35, 40]
            ];

            $scope.labels3 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series3 = ['KinesioTaping', 'Krioterapia', "Ultradźwięki"];
            $scope.data3 = [
                [30, 20, 50, 40, 56, 55, 40, 40, 30, 20, 30, 40],
                [30, 50, 30, 30, 40, 30, 40, 55, 10, 20, 35, 40],
                [10, 20, 60, 30, 45, 30, 15, 40, 80, 50, 30, 30]
                
            ];

            $scope.labels4 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series4 = ['NFZ', 'Prywatna'];
            $scope.data4 = [
                [65, 59, 80, 81, 56, 55, 40, 40, 10, 60, 40, 20],
                [10, 20, 50, 30, 45, 20, 15, 40, 60, 10, 30, 30]
            ];
        });
