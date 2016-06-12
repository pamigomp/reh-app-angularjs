'use strict';

angular.module('rehApp')

        .factory('ApplicationMetadataService', function () {
            return {
                getApplicationTitle: function () {
                    return 'RehApp';
                }
            };
        });
