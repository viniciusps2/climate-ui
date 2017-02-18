describe('WeatherCtrl Spec', function () {
  var scope, controller, q, weatherService

  beforeEach(function () {
    module('climate')
  })

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    weatherService = createWeatherServiceMock()
    q = $q

    controller = $controller('WeatherCtrl', {
      $scope: scope,
      WeatherService: weatherService,
      $routeParams: {localeId: 11}
    })
  }))

  describe('initialize', function () {
    it('should find locale for localeId received from route', function () {
      controller.initialize()
      scope.$digest()
      expect(controller.weatherItems).toEqual([{locale: {id: 11}}])
    })
  })

  describe('findByLocaleId', function () {
    it('should call find locale and update weatherItems', function () {
      controller.findByLocaleId(2)
      scope.$digest()
      expect(controller.weatherItems).toEqual([{locale: {id: 2}}])
    })
  })

  function createWeatherServiceMock () {
    return {
      findByLocaleId: function (id) {
        var defer = q.defer()
        defer.resolve([{locale: {id: id}}])
        return defer.promise
      }
    }
  }
})
