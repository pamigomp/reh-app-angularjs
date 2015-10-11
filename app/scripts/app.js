'use strict';

// Declare app level module which depends on views, and components
angular.module('RehApp', ['ui.router', 'ui.bootstrap', 'chart.js', 'ngAnimate'])

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
            $urlRouterProvider.otherwise('/dashboard');

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
                            breadcrumb: 'Panel'
                        },
                        views: {
                            'content@': {
                                templateUrl: 'views/dashboard/dashboard.html',
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
                                templateUrl: 'views/terms/pending.html',
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
                                templateUrl: 'views/terms/pending_list_empty.html',
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
                                templateUrl: 'views/terms/pending_list_error.html',
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
                                templateUrl: 'views/terms/pending/details.html',
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
                                templateUrl: 'views/terms/cancelled.html',
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
                                templateUrl: 'views/terms/cancelled_list_empty.html',
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
                                templateUrl: 'views/terms/cancelled_list_error.html',
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
                                templateUrl: 'views/terms/completed.html',
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
                                templateUrl: 'views/terms/completed_list_empty.html',
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
                                templateUrl: 'views/terms/completed_list_error.html',
                                controller: 'TermsCompletedController'
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

                    .state('root.patients.list_empty', {
                        url: '/list',
                        data: {
                            title: 'Lista Pacjentów',
                            breadcrumb: 'Lista'
                        },
                        views: {
                            '': {
                                templateUrl: 'views/patients/list_empty.html',
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
                                templateUrl: 'views/patients/list_error.html',
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
                                templateUrl: 'views/patients/patient/create.html',
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
                                templateUrl: 'views/patients/patient/details.html',
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
                                templateUrl: 'views/patients/patient/terms.html',
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
                                templateUrl: 'views/employees/list.html',
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
                                templateUrl: 'views/employees/list_empty.html',
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
                                templateUrl: 'views/employees/list_error.html',
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
                                templateUrl: 'views/employees/employee/create.html',
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
                                templateUrl: 'views/employees/employee/details.html',
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
                                templateUrl: 'views/employees/employee/terms.html',
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
                                templateUrl: 'views/charts/general.html',
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
                                templateUrl: 'views/charts/patients.html',
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
                                templateUrl: 'views/charts/treatments.html',
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
                                templateUrl: 'views/login.html',
                                controller: 'LoginController'
                            }
                        }
                    });
        });
