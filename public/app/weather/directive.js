;(function () {
  'use strict'

  angular.module('climate')
    .directive('weatherLocales', weatherLocales)

  function weatherLocales () {
    return {
      controller: 'WeatherCtrl',
      controllerAs: 'vm',
      templateUrl: 'app/weather/weather.html'
    }
  }
})()
