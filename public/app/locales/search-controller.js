;(function () {
  'use strict'

  angular.module('climate').controller('SearchLocalesCtrl', SearchLocalesCtrl)

  SearchLocalesCtrl.$inject = ['LocalesService', '$location']

  function SearchLocalesCtrl (LocalesService, $location) {
    var search = this

    search.name = ''

    search.showWeatherLocale = showWeatherLocale
    search.suggestion = suggestion

    function showWeatherLocale () {
      $location.path('/weather').search({localeId: search.locale.id})
    }

    function suggestion (name) {
      LocalesService.search(name).then(function (localesFound) {
        search.localesFound = localesFound
      })
    }
  }
})()
