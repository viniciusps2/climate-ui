;(function () {
  'use strict'

  angular.module('climate').service('WeatherService', WeatherService)

  WeatherService.$inject = ['$resource', 'environment']

  function WeatherService ($resource, environment) {
    var rootUrl = environment.climateApiUrl + '/weather'

    var resource = $resource(rootUrl, null, {
      'findAll': {
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

    function findAll () {
      return resource.findAll().$promise
    }

    function findByLocaleId (localeId) {
      return resource.findByLocaleId({localeId: localeId}).$promise
    }

    return {
      findAll: findAll,
      findByLocaleId: findByLocaleId
    }
  }
})()
