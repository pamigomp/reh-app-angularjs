(function () {
    'use strict';
    angular.module('rehApp')

            .config(config)
            .run(run);
    run.$inject = ['$state', '$rootScope', '$httpBackend', 'AuthService', 'AUTH_EVENTS'];
    function run($state, $rootScope, $httpBackend, AuthService, AUTH_EVENTS) {
        $rootScope.$state = $state;
        $httpBackend.whenGET(/core\/\w+.*/).passThrough();
        $httpBackend.whenGET(/common\/\w+.*/).passThrough();
        $httpBackend.whenGET(/https:\/\/apex.oracle.com\/pls\/apex\/pwr\/\w+.*/).passThrough();
        $httpBackend.whenPUT(/https:\/\/apex.oracle.com\/pls\/apex\/pwr\/\w+.*/).passThrough();
        $httpBackend.whenPOST(/https:\/\/apex.oracle.com\/pls\/apex\/pwr\/\w+.*/).passThrough();
        $httpBackend.whenDELETE(/https:\/\/apex.oracle.com\/pls\/apex\/pwr\/\w+.*/).passThrough();
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

            if ('data' in next && 'authorizedRoles' in next.data) {
                var authorizedRoles = next.data.authorizedRoles;
                if (!AuthService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    $state.go($state.current, {}, {reload: true});
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                }
            }

            if (!AuthService.isAuthenticated()) {
                if (next.name !== 'root.login') {
                    event.preventDefault();
                    $state.go('root.login');
                }
            }
        });
    }

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
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
            var $state = $injector.get('$state');
            $state.go('root.dashboard');
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
                            templateUrl: 'core/navigation/header/headerView.html',
                            controller: 'HeaderController',
                            controllerAs: 'HC'
                        },
                        'breadcrumbs': {
                            templateUrl: 'core/navigation/breadcrumbs/breadcrumbsView.html',
                            controller: 'BreadcrumbsController',
                            controllerAs: 'BC'
                        },
                        'menu': {
                            templateUrl: 'core/navigation/menu/menuView.html',
                            controller: 'MenuController',
                            controllerAs: 'MC'
                        },
                        'content': {
                            template: 'Wybierz pozycję z menu po lewej stronie...'
                        },
                        'footer': {
                            templateUrl: 'core/navigation/footer/footerView.html',
                            controller: 'FooterController',
                            controllerAs: 'FC'
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
                            templateUrl: 'core/dashboard/dashboardView.html',
                            controller: 'DashboardController',
                            controllerAs: 'DC'
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
                            template: '<div data-ui-view=\'\'></div>'
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
                            templateUrl: 'core/terms/pending/termsPendingListView.html',
                            controller: 'TermsPendingListController',
                            controllerAs: 'TPLC'
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
                            templateUrl: 'core/terms/pending/termsPendingListEmptyView.html',
                            controller: 'TermsPendingListController',
                            controllerAs: 'TPLC'
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
                            templateUrl: 'core/terms/pending/termsPendingListErrorView.html',
                            controller: 'TermsPendingListController',
                            controllerAs: 'TPLC'
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
                            template: '<div data-ui-view=\'\'></div>'
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
                            templateUrl: 'core/terms/pending/details/termPendingDetailsView.html',
                            controller: 'TermPendingDetailsController',
                            controllerAs: 'TPDC'
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
                            templateUrl: 'core/terms/cancelled/termsCancelledListView.html',
                            controller: 'TermsCancelledListController',
                            controllerAs: 'TCLC'
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
                            templateUrl: 'core/terms/cancelled/termsCancelledListEmptyView.html',
                            controller: 'TermsCancelledListController',
                            controllerAs: 'TCLC'
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
                            templateUrl: 'core/terms/cancelled/termsCancelledListErrorView.html',
                            controller: 'TermsCancelledListController',
                            controllerAs: 'TCLC'
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
                            templateUrl: 'core/terms/completed/termsCompletedListView.html',
                            controller: 'TermsCompletedListController',
                            controllerAs: 'TCLC'
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
                            templateUrl: 'core/terms/completed/termsCompletedListEmptyView.html',
                            controller: 'TermsCompletedController',
                            controllerAs: 'TCLC'
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
                            templateUrl: 'core/terms/completed/termsCompletedListErrorView.html',
                            controller: 'TermsCompletedListController',
                            controllerAs: 'TCLC'
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
                            templateUrl: 'core/terms/create/termCreateView.html',
                            controller: 'TermCreateController',
                            controllerAs: 'TCC'
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
                            template: '<div data-ui-view=\'\'></div>'
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
                            templateUrl: 'core/patients/list/patientsListView.html',
                            controller: 'PatientsListController',
                            controllerAs: 'PLC'
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
                            templateUrl: 'core/patients/list/patientsListEmptyView.html',
                            controller: 'PatientsListController',
                            controllerAs: 'PLC'
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
                            templateUrl: 'core/patients/list/patientsListErrorView.html',
                            controller: 'PatientsListController',
                            controllerAs: 'PLC'
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
                            templateUrl: 'core/patients/create/patientCreateView.html',
                            controller: 'PatientCreateController',
                            controllerAs: 'PCC'
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
                            template: '<div data-ui-view=\'\'></div>'
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
                            templateUrl: 'core/patients/details/patientDetailsView.html',
                            controller: 'PatientDetailsController',
                            controllerAs: 'PDC'
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
                            templateUrl: 'core/patients/terms/patientTermsView.html',
                            controller: 'PatientTermsController',
                            controllerAs: 'PTC'
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
                            template: '<div data-ui-view=\'\'></div>'
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
                            templateUrl: 'core/employees/list/employeesListView.html',
                            controller: 'EmployeesListController',
                            controllerAs: 'ELC'
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
                            templateUrl: 'core/employees/list/employeesListEmptyView.html',
                            controller: 'EmployeesListController',
                            controllerAs: 'ELC'
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
                            templateUrl: 'core/employees/list/employeesListErrorView.html',
                            controller: 'EmployeesListController',
                            controllerAs: 'ELC'
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
                            templateUrl: 'core/employees/create/employeeCreateView.html',
                            controller: 'EmployeeCreateController',
                            controllerAs: 'ECC'
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
                            template: '<div data-ui-view=\'\'></div>'
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
                            templateUrl: 'core/employees/details/employeeDetailsView.html',
                            controller: 'EmployeeDetailsController',
                            controllerAs: 'EDC'
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
                            templateUrl: 'core/employees/terms/employeeTermsView.html',
                            controller: 'EmployeeTermsController',
                            controllerAs: 'ETC'
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
                            template: '<div data-ui-view=\'\'></div>'
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
                            templateUrl: 'core/charts/general/chartsGeneralView.html',
                            controller: 'ChartsGeneralController',
                            controllerAs: 'CGC'
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
                            templateUrl: 'core/charts/patients/chartsPatientsView.html',
                            controller: 'ChartsPatientsController',
                            controllerAs: 'CPC'
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
                            templateUrl: 'core/charts/treatments/chartsTreatmentsView.html',
                            controller: 'ChartsTreatmentsController',
                            controllerAs: 'CTC'
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
                            templateUrl: 'core/login/loginView.html',
                            controller: 'LoginController',
                            controllerAs: 'LC'
                        }
                    }
                });
    }
})();
