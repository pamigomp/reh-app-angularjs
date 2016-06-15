'use strict';

angular.module('rehApp.login', ['rehApp.loginService'])

        .controller('LoginController', ['$rootScope', '$scope', '$state', 'AUTH_EVENTS', 'AuthService', 'loginService', function ($rootScope, $scope, $state, AUTH_EVENTS, AuthService, loginService) {
                $scope.data = {
                    email: '',
                    password: ''
                };
                $scope.credentialsError = false;
                $scope.loginError = false;

                $scope.login = function (data) {
                    loginService.verifyEmployeeCredentials($scope.data.email).then(function (employeeCredentials) {
                        if ((employeeCredentials.length > 0) && ($scope.data.password === employeeCredentials[0].password)) {
                            AuthService.login(employeeCredentials[0]).then(function (authenticated) {
                                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                                $state.go('root.dashboard', {}, {reload: true});
                                $scope.setCurrentUsername(employeeCredentials[0]);
                                $scope.setCurrentPosition(employeeCredentials[0].position);
                                $scope.credentialsError = false;
                                $scope.loginError = false;
                            }, function (err) {
                                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                                $scope.credentialsError = true;
                                $scope.loginError = false;
                            });
                        } else {
                            $scope.credentialsError = true;
                            $scope.loginError = false;
                        }
                    }, function () {
                        $scope.loginError = true;
                        $scope.credentialsError = false;
                    });
                };
            }]);
