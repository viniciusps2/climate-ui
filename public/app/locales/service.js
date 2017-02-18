;(function () {
  'use strict'

  angular.module('app').service('localesService', localesService)

  localesService.$inject = ['$resource', 'Environment']

  function localesService ($resource, Environment) {
    var rootUrl = Environment.climateApiUrl + '/locales'

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
