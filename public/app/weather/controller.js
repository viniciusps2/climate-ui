;(function () {
  'use strict'

  angular.module('app').controller('WeatherCtrl', WeatherCtrl)

  WeatherCtrl.$inject = ['weatherService', '$routeParams']

  function WeatherCtrl (weatherService, $routeParams) {
    var vm = this
    var localeId = $routeParams.localeId

    vm.findByLocaleId = findByLocaleId

    function findByLocaleId (localeId) {
      weatherService.findByLocaleId(localeId).then(function (weatherItems) {
        vm.weatherItems = weatherItems
      })
    }

    function initialize () {
      findByLocaleId(localeId)
    }

    initialize()
  }
})()
