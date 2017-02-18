(function() {
  'use strict'

  angular.module('climate')
    .directive('searchLocales', searchLocales)

    function searchLocales() {
      return {
        controller: 'SearchLocalesCtrl',
        controllerAs: 'search',
        templateUrl: 'app/locales/search.html'
      }
    }
})()
