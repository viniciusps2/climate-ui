describe('WeatherService Spec', function () {
  var q, httpBackend, rootScope, weatherService

  var environment = {
    climateApiUrl: 'http://localhost:3006'
  }
  beforeEach(function () {
    module('climate', function ($provide) {
      $provide.constant('environment', environment)
    })
  })

  beforeEach(inject(function ($q, $httpBackend, $rootScope, WeatherService) {
    weatherService = WeatherService
    httpBackend = $httpBackend
    rootScope = $rootScope
    q = $q
  }))

  describe('findByLocaleId', function () {
    it('should call API and return array with results', function () {
      httpBackend
        .whenGET(environment.climateApiUrl + '/weather/locales/5')
        .respond(200, {locale: {id: 5}, weather: []})

      weatherService.findByLocaleId(5)

      httpBackend.flush()
      rootScope.$apply()
    })
  })
  describe('getMainWeathers', function () {
    it('should call API and return array with all weather results', function () {
      httpBackend
        .whenGET(environment.climateApiUrl + '/weather')
        .respond(200, [{locale: {id: 3}, weather: []}])

      weatherService.getMainWeathers()

      httpBackend.flush()
      rootScope.$apply()
    })
  })
})
