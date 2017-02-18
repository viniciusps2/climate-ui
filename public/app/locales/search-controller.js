;(function () {
  'use strict'

  angular.module('app').controller('SearchLocalesCtrl', SearchLocalesCtrl)

  SearchLocalesCtrl.$inject = ['localesService']

  function SearchLocalesCtrl (localesService) {
    var search = this

    search.name = ''

    search.showWeatherLocale = showWeatherLocale
    search.suggestion = suggestion

    function showWeatherLocale () {
      console.log('===============logging: ====', search.locale);
    }

    function suggestion (name) {
      localesService.search(name).then(function (localesFound) {
        search.localesFound = localesFound
      })
    }
  }
})()
