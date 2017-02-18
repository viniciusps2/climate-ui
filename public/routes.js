;(function () {
  'use strict'

  angular.module('climate')
    .config(Config)

  /* @ngInject */
  function Config ($locationProvider, $routeProvider) {
    routes($locationProvider, $routeProvider)
  }

  function routes ($locationProvider, $routeProvider) {
    function route (url, opts) {
      $routeProvider.when(url, opts)
    }

    $routeProvider.otherwise({
      redirectTo: '/not_found'
    })

    route('/', {
      redirectTo: '/weather'
    })
    route('/not_found', {
      templateUrl: '404.html'
    })
    route('/weather', {
      templateUrl: 'app/weather/weather.html',
      controller: 'WeatherCtrl',
      controllerAs: 'vm'
    })
  }
})()
