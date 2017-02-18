;(function () {
  'use strict'

  angular.module('climate')
    .directive('navbar', navbar)

  function navbar () {
    return {
      templateUrl: 'components/navbar/navbar.html'
    }
  }
})()
