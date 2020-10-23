angular.module('demoApp', ['ui.bootstrap', 'ui.bootstrap.popover', 'ngAnimate', 'weeklyScheduler', 'weeklySchedulerI18N'])

  .config(['weeklySchedulerLocaleServiceProvider', function (localeServiceProvider) {
    localeServiceProvider.configure({
      doys: { 'pl-pl': 6 },
      lang: { 'pl-pl': { month: 'Miesiąc', weekNb: 'Tydzień', addNew: 'Dodaj' } },
      localeLocationPattern: '/vendor/angular-i18n/angular-locale_{{locale}}.js'
    });
  }])

  .controller('DemoController', ['$scope', '$timeout', 'weeklySchedulerLocaleService', '$log',
    function ($scope, $timeout, localeService, $log) {

      localeService.set('pl-pl');
      $scope.scheduler = {
        locale: localeService.$locale.id,
        options: {
          /*monoSchedule: true*/
          minDate: moment('2019-01-01'),
          maxDate: moment('2019-12-31'),
          labels: {
            month: 'Miesiąc',
            weekNb: 'Tydzień'
          }
        },
        items: [{
          id: 1,
          label: 'Budowa obwodnicy RE-2091 AAAA AAAAAA AAAAAAAAA AAAAA AAAA',
          contractDescription: 'Budowa obwodnicy RE-2091 AAAA AAAAAA AAAAAAAAA AAAAA AAAA',
          color: 'rgba(244,67,54,1)',
          schedules: [
            { start: moment('2019-02-02').toDate(), end: moment('2019-09-30').toDate() },
            { start: moment('2019-10-02').toDate(), end: moment('2019-11-30').toDate() }
          ]
        }, {
          id: 3,
          label: 'Budowa węzła C-11',
          contractDescription: 'Budowa obwodnicy RE-2091 AAAA AAAAAA AAAAAAAAA AAAAA AAAA',
          color: 'rgba(244,67,54,1)',
          schedules: [
            { start: moment('2019-01-10').toDate(), end: moment('2019-08-15').toDate() }
          ]
        }, {
          id: 4,
          label: 'Budowa węzła B-23',
          contractDescription: 'Budowa obwodnicy RE-2091 AAAA AAAAAA AAAAAAAAA AAAAA AAAA',
          color: 'rgba(244,67,54,1)',
          schedules: [
            { start: moment('2019-04-09').toDate(), end: moment('2019-09-02').toDate() }
          ]
        }]
      };

      this.clickSchedule = function (itemIndex, scheduleIndex, scheduleValue) {
        $log.debug('The model has click!', itemIndex, scheduleIndex, scheduleValue);

        // alert($scope.scheduler.items[itemIndex].label);
      };

      this.refreshScheduler = function () {
        $scope.scheduler = {
          locale: localeService.$locale.id,
          options: {
            /*monoSchedule: true*/
            minDate: moment('2020-01-01'),
            maxDate: moment('2020-12-31'),
            labels: {
              month: 'Miesiąc',
              weekNb: 'Tydzień'
            }
          },
          items: [{
            id: 2,
            label: 'Budowa węzła A-323',
            color: 'rgba(244,67,54,1)',
            schedules: [
              { start: moment('2020-02-02').toDate(), end: moment('2020-11-30').toDate() }
            ]
          }]
        };
      };

      this.onLocaleChange = function () {
        // $log.debug('The locale is changing to', $scope.scheduler.locale);
        localeService.set($scope.scheduler.locale).then(function ($locale) {
          $log.debug('The locale changed to', $locale.id);
        });
      };
    }]);