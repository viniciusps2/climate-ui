;(function () {
  'use strict'

  angular.module('climate').controller('WeatherCtrl', WeatherCtrl)

  WeatherCtrl.$inject = ['WeatherService', '$routeParams']

  function WeatherCtrl (WeatherService, $routeParams) {
    var vm = this
    var localeId = $routeParams.localeId

    vm.findByLocaleId = findByLocaleId
    vm.getMainWeathers = getMainWeathers
    vm.initialize = initialize

    function findByLocaleId (localeId) {
      WeatherService.findByLocaleId(localeId).then(function (weatherItems) {
        vm.weatherItems = weatherItems
      })
    }

    function getMainWeathers () {
      WeatherService.getMainWeathers().then(function (weatherItems) {
        vm.weatherItems = weatherItems
      })
    }

    function initialize () {
      localeId ? findByLocaleId(localeId) : getMainWeathers()
    }

    initialize()
  }
})()
