describe('LocalesService Spec', function () {
  var q, httpBackend, rootScope, localesService

  var environment = {
    climateApiUrl: 'http://localhost:3006'
  }
  beforeEach(function () {
    module('climate', function ($provide) {
      $provide.constant('environment', environment)
    })
  })

  beforeEach(inject(function ($q, $httpBackend, $rootScope, LocalesService) {
    localesService = LocalesService
    httpBackend = $httpBackend
    rootScope = $rootScope
    q = $q
  }))

  describe('search', function () {
    it('should call API and return array', function () {
      httpBackend
        .whenPOST(environment.climateApiUrl + '/locales/search', {name: 'Osas'})
        .respond(200, [{locale: {id: 1}}])

      localesService.search('Osas')

      httpBackend.flush()
      rootScope.$apply()
    })
  })
})
