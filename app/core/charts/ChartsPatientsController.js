'use strict';

angular.module('rehApp')

        .controller('ChartsPatientsController', function ($scope) {
            $scope.labels = ["Kobiety", "Mężczyźni"];
            $scope.data = [300, 500];

            $scope.labels2 = ["0-25", "26-50", "51-75", "76+"];
            $scope.data2 = [130, 250, 350, 70];

            $scope.labels3 = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
            $scope.series3 = ['Series A'];
            $scope.data3 = [
                [65, 59, 80, 81, 56, 55, 40, 40, 10, 60, 40, 20]
            ];
        });
