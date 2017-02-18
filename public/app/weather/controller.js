;(function () {
  'use strict'

  angular.module('app').controller('WeatherCtrl', WeatherCtrl)

  WeatherCtrl.$inject = ['weatherService']

  function WeatherCtrl (weatherService) {
    var vm = this

    vm.searchWeather = searchWeather

    function searchWeather () {
      weatherService.findAll().then(function (weatherItems) {
        vm.weatherItems = weatherItems
      })
    }

    function initialize () {
      searchWeather()
    }

    initialize()
  }
})()
