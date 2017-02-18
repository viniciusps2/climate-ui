describe('Routes', function () {
  var route, location, rootScope

  beforeEach(function () {
    module('climate')
  })

  beforeEach(inject(
    function ($route, $location, $rootScope, $httpBackend) {
      location = $location
      route = $route
      rootScope = $rootScope
    }
  ))

  describe('/weather', function () {
    it('should load weather and send user to weather view', function () {
      expect(route.routes['/weather'].templateUrl).toEqual('app/weather/weather.html')
    })
  })

  describe('/', function () {
    it('should load home and send user to home view', function () {
      expect(route.routes['/'].templateUrl).toEqual('app/home/home.html')
    })
  })
})
