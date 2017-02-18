;(function () {
  'use strict'

  angular.module('climate').service('WeatherService', WeatherService)

  WeatherService.$inject = ['$resource', 'environment']

  function WeatherService ($resource, environment) {
    var rootUrl = environment.climateApiUrl + '/weather'

    var resource = $resource(rootUrl, null, {
      'getMainWeathers': {
        url: rootUrl + '/',
        method: 'GET',
        isArray: true
      },

      'findByLocaleId': {
        url: rootUrl + '/locales/:localeId',
        method: 'GET',
        isArray: true
      }
    })

    function getMainWeathers () {
      return resource.getMainWeathers().$promise
    }

    function findByLocaleId (localeId) {
      return resource.findByLocaleId({localeId: localeId}).$promise
    }

    return {
      getMainWeathers: getMainWeathers,
      findByLocaleId: findByLocaleId
    }
  }
})()
