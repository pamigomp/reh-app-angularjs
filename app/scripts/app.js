'use strict';

// Declare app level module which depends on views, and components
angular.module('RehApp', ['ui.router', 'ui.bootstrap', 'chart.js'])

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('/', '/patients');
            $urlRouterProvider.when('/patients', '/patients/list');
            $urlRouterProvider.when('/patients/', '/patients/list');
            $urlRouterProvider.otherwise('/dashboard');

            $stateProvider.state('root', {
                abstract: true,
                url: '',
                data: {
                    title: 'Strona domowa',
                    breadcrumb: 'Strona domowa'
                },
                views: {
                    'header': {
                        templateUrl: 'views/navigation/header.html',
                        controller: 'LoginController'
                    },
                    'breadcrumbs': {
                        templateUrl: 'views/navigation/breadcrumbs.html',
                        controller: 'BreadcrumbsController'
                    },
                    'menu': {
                        templateUrl: 'views/navigation/menu.html',
                        controller: 'MenuController'
                    },
                    'content': {
                        template: 'Wybierz pozycję z menu po lewej stronie...'
                    }
                }
            })
                    .state('root.dashboard', {
                        url: '/dashboard',
                        data: {
                            title: 'Panel nawigacyjny',
                            breadcrumb: 'Panel nawigacyjny'
                        },
                        views: {
                            'content@': {
                                templateUrl: 'views/dashboard/dashboard.html',
                                controller: 'DashboardController'
                            }
                        }
                    })

                    .state('root.patients', {
                        abstract: true,
                        url: '/patients',
                        data: {
                            title: 'Pacjenci',
                            breadcrumb: 'Pacjenci'
                        },
                        views: {
                            'content@': {
                                template: '<div data-ui-view=""></div>'
                            }
                        }
                    })

                    .state('root.patients.list', {
                        url: '/list',
                        data: {
                            title: 'Lista Pacjentów',
                            breadcrumb: 'Lista'
                        },
                        views: {
                            '': {
                                templateUrl: 'views/patients/list.html',
                                controller: 'PatientsListController'
                            }
                        }
                    })

                    .state('root.login', {
                        url: '/login',
                        data: {
                            title: 'Logowanie'
                        },
                        views: {
                            'menu@': {
                                template: ''
                            },
                            'breadcrumbs@': {
                                template: ''
                            },
                            'content@': {
                                templateUrl: 'views/login.html',
                                controller: 'LoginController'
                            }
                        }
                    });
        });
