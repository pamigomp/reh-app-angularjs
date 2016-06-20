(function () {
    'use strict';

    angular.module('rehApp')

            .constant('APP_AUTHOR', 'Michal Pietrzak')

            .constant('APP_NAME', 'RehApp')

            .constant('APP_VERSION', '1.0.0')

            .constant('AUTH_EVENTS', {
                sessionTimeout: 'auth-session-timeout',
                notAuthenticated: 'auth-not-authenticated',
                notAuthorized: 'auth-not-authorized'
            })

            .constant('USER_ROLES', {
                user: 'user_role',
                admin: 'admin_role'
            });
})();
