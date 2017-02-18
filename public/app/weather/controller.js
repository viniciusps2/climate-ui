;(function () {
  'use strict'

  angular.module('climate').controller('WeatherCtrl', WeatherCtrl)

  WeatherCtrl.$inject = ['WeatherService', '$routeParams']

  function WeatherCtrl (WeatherService, $routeParams) {
    var vm = this
    var localeId = $routeParams.localeId

    vm.findByLocaleId = findByLocaleId

    function findByLocaleId (localeId) {
      WeatherService.findByLocaleId(localeId).then(function (weatherItems) {
        vm.weatherItems = weatherItems
      })
    }

    function initialize () {
      findByLocaleId(localeId)
    }

    initialize()
  }
})()
