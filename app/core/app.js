(function () {
    'use strict';

    angular.module('rehApp', [
        'ngMockE2E',
        'ui.bootstrap',
        'ngAnimate',
        'rehApp.directives.modal',
        'rehApp.pageTitle',
        'rehApp.charts.general',
        'rehApp.charts.patients',
        'rehApp.charts.treatments',
        'rehApp.dashboard',
        'rehApp.employees.create',
        'rehApp.employees.details',
        'rehApp.employees.list',
        'rehApp.employees.terms',
        'rehApp.login',
        'rehApp.nav.breadcrumbs',
        'rehApp.nav.footer',
        'rehApp.nav.header',
        'rehApp.nav.menu',
        'rehApp.nav.master',
        'rehApp.patients.create',
        'rehApp.patients.details',
        'rehApp.patients.list',
        'rehApp.patients.terms',
        'rehApp.terms.cancelled.list',
        'rehApp.terms.completed.list',
        'rehApp.terms.create',
        'rehApp.terms.pending.list',
        'rehApp.terms.pending.details'
    ]);
})();
