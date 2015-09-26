'use strict';

angular.module('RehApp')

        .factory('ApplicationMetadataService', function () {
            return {
                getApplicationTitle: function () {
                    return 'RehApp';
                }
            };
        });
