angular.module('demoApp', ['ngAnimate', 'weeklyScheduler', 'weeklySchedulerI18N'])

  .config(['weeklySchedulerLocaleServiceProvider', function (localeServiceProvider) {
    localeServiceProvider.configure({
      doys: { 'pl-pl': 6 },
      lang: { 'pl-pl': { month: 'Miesiąc', weekNb: 'Tydzień', addNew: 'Dodaj' } },
      localeLocationPattern: '/vendor/angular-i18n/angular-locale_{{locale}}.js'
    });
  }])

  .controller('DemoController', ['$scope', '$timeout', 'weeklySchedulerLocaleService', '$log',
    function ($scope, $timeout, localeService, $log) {

      // localeService.set('pl-pl');
      $scope.model = {
        locale: localeService.$locale.id,
        options: {
          /*monoSchedule: true*/
          minDate: moment('2019-01-01'),
          maxDate: moment('2019-12-31')
        },
        items: [{
          label: 'Budowa obwodnicy RE-2091',
          editable: false,
          schedules: [
            { start: moment('2019-02-02').toDate(), end: moment('2019-11-30').toDate() }
          ]
        }, {
          label: 'Budowa węzła A-323',
          editable: false,
          schedules: [
            { start: moment('2019-02-02').toDate(), end: moment('2020-11-30').toDate() }
          ]
        }, {
          label: 'Budowa węzła C-11',
          editable: false,
          schedules: [
            { start: moment('2019-01-10').toDate(), end: moment('2019-08-15').toDate() }
          ]
        }, {
          label: 'Budowa węzła B-23',
          editable: false,
          schedules: [
            { start: moment('2019-04-09').toDate(), end: moment('2019-09-02').toDate() }
          ]
        }]
      };

      this.doSomething = function (itemIndex, scheduleIndex, scheduleValue) {
        $log.debug('The model has changed!', itemIndex, scheduleIndex, scheduleValue);
      };

      this.onLocaleChange = function () {
        $log.debug('The locale is changing to', $scope.model.locale);
        localeService.set($scope.model.locale).then(function ($locale) {
          $log.debug('The locale changed to', $locale.id);
        });
      };
    }]);