angular
  .module('app', ['ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'ui.select'])

  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('')
  }])
