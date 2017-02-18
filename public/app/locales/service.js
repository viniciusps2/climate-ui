;(function () {
  'use strict'

  angular.module('climate').service('LocalesService', LocalesService)

  LocalesService.$inject = ['$resource', 'environment']

  function LocalesService ($resource, environment) {
    var rootUrl = environment.climateApiUrl + '/locales'

    var resource = $resource(rootUrl, null, {
      'search': {
        url: rootUrl + '/search',
        method: 'POST',
        isArray: true
      }
    })

    function search (name) {
      return resource.search({name: name}).$promise
    }

    return {
      search: search
    }
  }
})()
