;(function () {
  'use strict'

  angular.module('app').controller('SearchLocalesCtrl', SearchLocalesCtrl)

  SearchLocalesCtrl.$inject = ['localesService', '$location']

  function SearchLocalesCtrl (localesService, $location) {
    var search = this

    search.name = ''

    search.showWeatherLocale = showWeatherLocale
    search.suggestion = suggestion

    function showWeatherLocale () {
      $location.path('/weather').search({localeId: search.locale.id})
    }

    function suggestion (name) {
      localesService.search(name).then(function (localesFound) {
        search.localesFound = localesFound
      })
    }
  }
})()
