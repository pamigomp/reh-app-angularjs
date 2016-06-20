(function () {
    'use strict';

    angular.module('rehApp.loginService', ['rehApp.dataStorageService'])

            .service('loginService', ['$q', 'dataStorageService', function ($q, dataStorageService) {
                    var loginDataService = {};

                    loginDataService.verifyEmployeeCredentials = function (email) {
                        var deferred = $q.defer();

                        dataStorageService.verifyCredentials(email).then(
                                function (employeeCredentials) {
                                    deferred.resolve(employeeCredentials.data.items);
                                },
                                function () {
                                    deferred.reject();
                                });
                        return deferred.promise;
                    };

                    return loginDataService;
                }])

            .service('AuthService', ['$q', '$http', 'USER_ROLES', function ($q, $http, USER_ROLES) {
                    var LOCAL_TOKEN_KEY = 'yourTokenKey';
                    var isAuthenticated = false;
                    var role = '';
                    var authToken;

                    function loadUserCredentials() {
                        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
                        if (token) {
                            useCredentials(token);
                        }
                    }

                    function storeUserCredentials(user) {
                        window.localStorage.setItem(LOCAL_TOKEN_KEY, user.email + '.yourServerToken');
                        useCredentials(user);
                    }

                    function useCredentials(user) {
                        isAuthenticated = true;
                        authToken = user.email + '.yourServerToken';
                        role = USER_ROLES.user;

                        // Set the token as header for your requests!
                        $http.defaults.headers.common['X-Auth-Token'] = user.email + '.yourServerToken';
                    }

                    function destroyUserCredentials() {
                        authToken = undefined;
                        isAuthenticated = false;
                        $http.defaults.headers.common['X-Auth-Token'] = undefined;
                        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
                        window.localStorage.removeItem("username");
                        window.localStorage.removeItem("position");
                    }

                    var login = function (user) {
                        return $q(function (resolve, reject) {
                            if (user.email.length >= 5) {
                                // Make a request and receive your auth token from your server
                                storeUserCredentials(user);
                                resolve('Login success.');
                            } else {
                                reject('Login failed.');
                            }
                        });
                    };

                    var logout = function () {
                        destroyUserCredentials();
                    };

                    var isAuthorized = function (authorizedRoles) {
                        if (!angular.isArray(authorizedRoles)) {
                            authorizedRoles = [authorizedRoles];
                        }
                        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
                    };

                    loadUserCredentials();

                    return {
                        login: login,
                        logout: logout,
                        isAuthorized: isAuthorized,
                        isAuthenticated: function () {
                            return isAuthenticated;
                        },
                        role: function () {
                            return role;
                        }
                    };
                }])

            .factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {
                    return {
                        responseError: function (response) {
                            $rootScope.$broadcast({
                                401: AUTH_EVENTS.notAuthenticated,
                                403: AUTH_EVENTS.notAuthorized,
                                419: AUTH_EVENTS.sessionTimeout,
                                440: AUTH_EVENTS.sessionTimeout
                            }[response.status], response);
                            return $q.reject(response);
                        }
                    };
                }])

            .config(['$httpProvider', function ($httpProvider) {
                    $httpProvider.interceptors.push('AuthInterceptor');
                }]);
})();
