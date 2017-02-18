(function() {
  'use strict'

  angular.module('app')
    .directive('searchLocales', searchLocales)

    function searchLocales() {
      return {
        controller: 'SearchLocalesCtrl',
        controllerAs: 'search',
        templateUrl: 'app/locales/search.html'
      }
    }
})()
