;(function () {
  'use strict'

  angular.module('app').service('weatherService', weatherService)

  weatherService.$inject = ['$resource', 'Environment']

  function weatherService ($resource, Environment) {
    var rootUrl = Environment.climateApiUrl + '/weather'

    var resource = $resource(rootUrl, null, {
      'findAll': {
        url: rootUrl + '/',
        method: 'GET',
        isArray: true
      },

      'findByLocaleId': {
        url: rootUrl + '/:id',
        method: 'GET',
        isArray: true
      }
    })

    function findAll () {
      return resource.findAll().$promise
    }

    function findByLocaleId (id) {
      return resource.findByLocaleId({id: id}).$promise
    }

    return {
      findAll: findAll,
      findByLocaleId: findByLocaleId
    }
  }
})()
