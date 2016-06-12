'use strict';

angular.module('rehApp')

        .controller('DashboardController', function ($scope) {
            $scope.labels = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series = ['Series A'];
            $scope.data = [
                [6500, 5900, 8000, 8100, 5600, 5500, 4000, 4000, 1000, 6000, 4000, 2000]
            ];

            $scope.labels2 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series2 = ['Series A'];
            $scope.data2 = [
                [350, 500, 600, 400, 700, 600, 550, 400, 475, 400, 600, 550]
            ];
        });
