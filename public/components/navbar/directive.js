(function() {
  'use strict'

  angular.module('app')
    .directive('navbar', navbar)

    function navbar() {
      return {
        templateUrl: 'components/navbar/navbar.html'
      }
    }
})()
