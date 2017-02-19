;(function () {
  'use strict'

  angular.module('climate')

    .constant('environment', {
      climateApiUrl: checkInjectedVariable('/* @echo CLIMATE_API_URL */', 'http://localhost:3006')
    })

  function checkInjectedVariable (value, defaultValue) {
    return value === 'undefined' || value.indexOf('echo') >= 0 ? defaultValue : value.replace(/\/$/, '')
  }
})()
