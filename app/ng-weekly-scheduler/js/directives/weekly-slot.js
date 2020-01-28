angular.module('weeklyScheduler')

  .directive('weeklySlot', ['weeklySchedulerTimeService', function (timeService) {
    return {
      restrict: 'E',
      require: ['^weeklyScheduler', 'ngModel'],
      templateUrl: 'ng-weekly-scheduler/views/weekly-slot.html',
      link: function (scope, element, attrs, ctrls) {
        var schedulerCtrl = ctrls[0], ngModelCtrl = ctrls[1];
        var conf = schedulerCtrl.config;
        var index = scope.$parent.$index;
        var containerEl = element.parent();
        var valuesOnDragStart = {
          start: scope.schedule.start,
          end: scope.schedule.end,
          color: scope.item.color
        };

        var mergeOverlaps = function () {
          var schedule = scope.schedule;
          schedule.color = scope.item.color;
          var schedules = scope.item.schedules;
          schedules.forEach(function (el) {
            
            if (el !== schedule) {
              // model is inside another slot
              if (el.end >= schedule.end && el.start <= schedule.start) {
                schedules.splice(schedules.indexOf(el), 1);
                schedule.end = el.end;
                schedule.start = el.start;
              }
              // model completely covers another slot
              else if (schedule.end >= el.end && schedule.start <= el.start) {
                schedules.splice(schedules.indexOf(el), 1);
              }
              // another slot's end is inside current model
              else if (el.end >= schedule.start && el.end <= schedule.end) {
                schedules.splice(schedules.indexOf(el), 1);
                schedule.start = el.start;
              }
              // another slot's start is inside current model
              else if (el.start >= schedule.start && el.start <= schedule.end) {
                schedules.splice(schedules.indexOf(el), 1);
                schedule.end = el.end;
              }
            }
          });
        };

        element.on('mouseover', function () {
          element.addClass('active'); containerEl.addClass('slot-hover');

        });

        element.on('mouseleave', function () {
          element.removeClass('active'); containerEl.removeClass('slot-hover');
        });

        scope.clickSchedule = function () {

          valuesOnDragStart = {
            start: ngModelCtrl.$viewValue.start,
            end: ngModelCtrl.$viewValue.end,
            color: ngModelCtrl.$viewValue.color
          };

          ngModelCtrl.$setViewValue({
            start: valuesOnDragStart.start,
            end: valuesOnDragStart.end,
            color: valuesOnDragStart.color
          });
          ngModelCtrl.$render();
        };

        // on init, merge overlaps
        mergeOverlaps(true);

        //// UI -> model ////////////////////////////////////
        ngModelCtrl.$parsers.push(function onUIClick(ui) {

          ngModelCtrl.$modelValue.start = timeService.addWeek(conf.minDate, ui.start).toDate();
          ngModelCtrl.$modelValue.end = timeService.addWeek(conf.minDate, ui.end).toDate();
          ngModelCtrl.$modelValue.color = ui.color;
          // $log.debug('PARSER :', ngModelCtrl.$modelValue.$$hashKey, ngModelCtrl.$modelValue);
          schedulerCtrl.on.click(index, scope.$index, ngModelCtrl.$modelValue);
          return ngModelCtrl.$modelValue;
        });

        //// model -> UI ////////////////////////////////////
        ngModelCtrl.$formatters.push(function onModelChange(model) {

          var ui = {
            start: timeService.weekPreciseDiff(conf.minDate, moment(model.start), true),
            end: timeService.weekPreciseDiff(conf.minDate, moment(model.end), true),
            color: model.color
          };
          //$log.debug('FORMATTER :', index, scope.$index, ui);
          return ui;
        });

        ngModelCtrl.$render = function () {

          var ui = ngModelCtrl.$viewValue;
          var css = {
            left: ui.start / conf.nbWeeks * 100 + '%',
            width: (ui.end - ui.start) / conf.nbWeeks * 100 + '%',
            background: ui.color
          };

          //$log.debug('RENDER :', index, scope.$index, css);
          element.css(css);
        };

        scope.$on('weeklySchedulerLocaleChanged', function () {
          // Simple change object reference so that ngModel triggers formatting & rendering
          scope.schedule = angular.copy(scope.schedule);
        });
      }
    };
  }]);