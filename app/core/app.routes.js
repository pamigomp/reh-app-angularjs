'use strict';
angular.module('rehApp')

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('', '/dashboard');
            $urlRouterProvider.when('/', '/dashboard');
            $urlRouterProvider.when('/patients', '/patients/list');
            $urlRouterProvider.when('/patients/', '/patients/list');
            $urlRouterProvider.when('/employees', '/employees/list');
            $urlRouterProvider.when('/employees/', '/employees/list');
            $urlRouterProvider.when('/charts', '/charts/general');
            $urlRouterProvider.when('/charts/', '/charts/general');
            $urlRouterProvider.when('/terms', '/terms/pending');
            $urlRouterProvider.when('/terms/', '/terms/pending');
            $urlRouterProvider.otherwise(function ($injector) {
                var $state = $injector.get("$state");
                $state.go("root.dashboard");
            });
            $stateProvider

                    .state('root', {
                        abstract: true,
                        url: '',
                        data: {
                            title: 'Strona domowa',
                            breadcrumb: 'Strona domowa'
                        },
                        views: {
                            'header': {
                                templateUrl: 'core/navigation/header.html',
                                controller: 'LoginController'
                            },
                            'breadcrumbs': {
                                templateUrl: 'core/navigation/breadcrumbs.html',
                                controller: 'BreadcrumbsController'
                            },
                            'menu': {
                                templateUrl: 'core/navigation/menu.html',
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
                            breadcrumb: 'Panel'
                        },
                        views: {
                            'content@': {
                                templateUrl: 'core/dashboard/dashboard.html',
                                controller: 'DashboardController'
                            }
                        }
                    })

                    .state('root.terms', {
                        abstract: true,
                        url: '/terms',
                        data: {
                            title: 'Terminy',
                            breadcrumb: 'Terminy'
                        },
                        views: {
                            'content@': {
                                template: '<div data-ui-view=""></div>'
                            }
                        }
                    })

                    .state('root.terms.pending', {
                        url: '/pending',
                        data: {
                            title: 'Lista oczekujących terminów',
                            breadcrumb: 'Oczekujące'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/pending.html',
                                controller: 'TermsPendingController'
                            }
                        }
                    })

                    .state('root.terms.pending_empty', {
                        url: '/pending',
                        data: {
                            title: 'Lista oczekujących terminów',
                            breadcrumb: 'Oczekujące'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/pending_list_empty.html',
                                controller: 'TermsPendingController'
                            }
                        }
                    })

                    .state('root.terms.pending_error', {
                        url: '/pending',
                        data: {
                            title: 'Lista oczekujących terminów',
                            breadcrumb: 'Oczekujące'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/pending_list_error.html',
                                controller: 'TermsPendingController'
                            }
                        }
                    })


                    .state('root.terms.pending.term', {
                        abstract: true,
                        url: '/:termId',
                        data: {
                            title: '[ID]',
                            breadcrumb: '[ID]'
                        },
                        views: {
                            'content@': {
                                template: '<div data-ui-view=""></div>'
                            }
                        }
                    })

                    .state('root.terms.pending.term.details', {
                        url: '/details',
                        data: {
                            title: 'Szczegóły zabiegu',
                            breadcrumb: 'Szczegóły'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/pending/details.html',
                                controller: 'PendingDetailsController'
                            }
                        }
                    })

                    .state('root.terms.cancelled', {
                        url: '/cancelled',
                        data: {
                            title: 'Lista odwołanych terminów',
                            breadcrumb: 'Odwołane'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/cancelled.html',
                                controller: 'TermsCancelledController'
                            }
                        }
                    })

                    .state('root.terms.cancelled_empty', {
                        url: '/cancelled',
                        data: {
                            title: 'Lista odwołanych terminów',
                            breadcrumb: 'Odwołane'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/cancelled_list_empty.html',
                                controller: 'TermsCancelledController'
                            }
                        }
                    })

                    .state('root.terms.cancelled_error', {
                        url: '/cancelled',
                        data: {
                            title: 'Lista odwołanych terminów',
                            breadcrumb: 'Odwołane'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/cancelled_list_error.html',
                                controller: 'TermsCancelledController'
                            }
                        }
                    })

                    .state('root.terms.completed', {
                        url: '/completed',
                        data: {
                            title: 'Lista zrealizowanych terminów',
                            breadcrumb: 'Zrealizowane'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/completed.html',
                                controller: 'TermsCompletedController'
                            }
                        }
                    })

                    .state('root.terms.completed_empty', {
                        url: '/completed',
                        data: {
                            title: 'Lista zrealizowanych terminów',
                            breadcrumb: 'Zrealizowane'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/completed_list_empty.html',
                                controller: 'TermsCompletedController'
                            }
                        }
                    })

                    .state('root.terms.completed_error', {
                        url: '/completed',
                        data: {
                            title: 'Lista zrealizowanych terminów',
                            breadcrumb: 'Zrealizowane'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/completed_list_error.html',
                                controller: 'TermsCompletedController'
                            }
                        }
                    })

                    .state('root.terms.new', {
                        url: '/new',
                        data: {
                            title: 'Nowy termin',
                            breadcrumb: 'Nowy termin'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/terms/term/create.html',
                                controller: 'TermCreateController'
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
                                templateUrl: 'core/patients/list.html',
                                controller: 'PatientsListController'
                            }
                        }
                    })

                    .state('root.patients.list_empty', {
                        url: '/list',
                        data: {
                            title: 'Lista Pacjentów',
                            breadcrumb: 'Lista'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/patients/list_empty.html',
                                controller: 'PatientsListController'
                            }
                        }
                    })

                    .state('root.patients.list_error', {
                        url: '/list',
                        data: {
                            title: 'Lista Pacjentów',
                            breadcrumb: 'Lista'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/patients/list_error.html',
                                controller: 'PatientsListController'
                            }
                        }
                    })

                    .state('root.patients.new', {
                        url: '/new',
                        data: {
                            title: 'Nowy pacjent',
                            breadcrumb: 'Nowy pacjent'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/patients/patient/create.html',
                                controller: 'PatientCreateController'
                            }
                        }
                    })

                    .state('root.patients.patient', {
                        abstract: true,
                        url: '/:patientPesel',
                        data: {
                            title: '[PESEL]',
                            breadcrumb: '[PESEL]'
                        },
                        views: {
                            'content@': {
                                template: '<div data-ui-view=""></div>'
                            }
                        }
                    })

                    .state('root.patients.patient.details', {
                        url: '/details',
                        data: {
                            title: 'Szczegóły pacjenta',
                            breadcrumb: 'Szczegóły'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/patients/patient/details.html',
                                controller: 'PatientDetailsController'
                            }
                        }
                    })

                    .state('root.patients.patient.terms', {
                        url: '/terms',
                        data: {
                            title: 'Terminy zabiegów pacjenta',
                            breadcrumb: 'Terminy'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/patients/patient/terms.html',
                                controller: 'PatientTermsController'
                            }
                        }
                    })

                    .state('root.employees', {
                        abstract: true,
                        url: '/employees',
                        data: {
                            title: 'Pracownicy',
                            breadcrumb: 'Pracownicy'
                        },
                        views: {
                            'content@': {
                                template: '<div data-ui-view=""></div>'
                            }
                        }
                    })

                    .state('root.employees.list', {
                        url: '/list',
                        data: {
                            title: 'Lista Pracowników',
                            breadcrumb: 'Lista'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/employees/list.html',
                                controller: 'EmployeesListController'
                            }
                        }
                    })

                    .state('root.employees.list_empty', {
                        url: '/list',
                        data: {
                            title: 'Lista Pracowników',
                            breadcrumb: 'Lista'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/employees/list_empty.html',
                                controller: 'EmployeesListController'
                            }
                        }
                    })

                    .state('root.employees.list_error', {
                        url: '/list',
                        data: {
                            title: 'Lista Pracowników',
                            breadcrumb: 'Lista'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/employees/list_error.html',
                                controller: 'EmployeesListController'
                            }
                        }
                    })

                    .state('root.employees.new', {
                        url: '/new',
                        data: {
                            title: 'Nowy pracownik',
                            breadcrumb: 'Nowy pracownik'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/employees/employee/create.html',
                                controller: 'EmployeeCreateController'
                            }
                        }
                    })

                    .state('root.employees.employee', {
                        abstract: true,
                        url: '/:employeeId',
                        data: {
                            title: '[ID]',
                            breadcrumb: '[ID]'
                        },
                        views: {
                            'content@': {
                                template: '<div data-ui-view=""></div>'
                            }
                        }
                    })

                    .state('root.employees.employee.details', {
                        url: '/details',
                        data: {
                            title: 'Szczegóły pracownika',
                            breadcrumb: 'Szczegóły'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/employees/employee/details.html',
                                controller: 'EmployeeDetailsController'
                            }
                        }
                    })

                    .state('root.employees.employee.terms', {
                        url: '/terms',
                        data: {
                            title: 'Terminy zabiegów pracownika',
                            breadcrumb: 'Terminy'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/employees/employee/terms.html',
                                controller: 'EmployeeTermsController'
                            }
                        }
                    })

                    .state('root.charts', {
                        abstract: true,
                        url: '/charts',
                        data: {
                            title: 'Wykresy',
                            breadcrumb: 'Wykresy'
                        },
                        views: {
                            'content@': {
                                template: '<div data-ui-view=""></div>'
                            }
                        }
                    })

                    .state('root.charts.general', {
                        url: '/general',
                        data: {
                            title: 'Wykresy Ogólne',
                            breadcrumb: 'Ogólne'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/charts/general.html',
                                controller: 'ChartsGeneralController'
                            }
                        }
                    })

                    .state('root.charts.patients', {
                        url: '/patients',
                        data: {
                            title: 'Wykresy Pacjentów',
                            breadcrumb: 'Pacjenci'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/charts/patients.html',
                                controller: 'ChartsPatientsController'
                            }
                        }
                    })

                    .state('root.charts.treatments', {
                        url: '/treatments',
                        data: {
                            title: 'Wykresy Zabiegów',
                            breadcrumb: 'Zabiegi'
                        },
                        views: {
                            '': {
                                templateUrl: 'core/charts/treatments.html',
                                controller: 'ChartsTreatmentsController'
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
                                templateUrl: 'core/login.html',
                                controller: 'LoginController'
                            }
                        }
                    });
        })
        .run(function ($state, $rootScope) {
            $rootScope.$state = $state;
        })
        .run(function ($httpBackend) {
            $httpBackend.whenGET(/core\/\w+.*/).passThrough();
            $httpBackend.whenGET(/common\/\w+.*/).passThrough();
            $httpBackend.whenGET(/https:\/\/apex.oracle.com\/pls\/apex\/pwr\/\w+.*/).passThrough();
            $httpBackend.whenPUT(/https:\/\/apex.oracle.com\/pls\/apex\/pwr\/\w+.*/).passThrough();
            $httpBackend.whenPOST(/https:\/\/apex.oracle.com\/pls\/apex\/pwr\/\w+.*/).passThrough();
            $httpBackend.whenDELETE(/https:\/\/apex.oracle.com\/pls\/apex\/pwr\/\w+.*/).passThrough();
        });
//        .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
//            $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
//
//                if ('data' in next && 'authorizedRoles' in next.data) {
//                    var authorizedRoles = next.data.authorizedRoles;
//                    if (!AuthService.isAuthorized(authorizedRoles)) {
//                        event.preventDefault();
//                        $state.go($state.current, {}, {reload: true});
//                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
//                    }
//                }
//
//                if (!AuthService.isAuthenticated()) {
//                    if (next.name !== 'root.login') {
//                        event.preventDefault();
//                        $state.go('root.login');
//                    }
//                }
//            });
//});
