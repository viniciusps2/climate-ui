describe('WeatherCtrl Spec', function () {
  var scope, controller, q, weatherService, weatherCtrl

  beforeEach(function () {
    module('climate')
  })

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    weatherService = createWeatherServiceMock()
    q = $q

    controller = $controller
    weatherCtrl = createController({localeId: 11})
  }))

  describe('initialize', function () {
    it('should find locale for localeId received from route', function () {
      weatherCtrl.initialize()
      scope.$digest()
      expect(weatherCtrl.weatherItems[0].locale.id).toEqual(11)
    })
    it('when not has localeId should load weather for main locales', function () {
      weatherCtrl = createController({})
      weatherCtrl.initialize()
      scope.$digest()
      expect(weatherCtrl.weatherItems).toEqual([{locale: {id: 8}}])
    })
  })

  describe('findByLocaleId', function () {
    it('should find locale and update weatherItems', function () {
      weatherCtrl.findByLocaleId(2)
      scope.$digest()
      expect(weatherCtrl.weatherItems).toEqual([{locale: {id: 2}}])
    })
  })

  describe('getMainWeathers', function () {
    it('should find weather for main locales', function () {
      weatherCtrl.getMainWeathers(11)
      scope.$digest()
      expect(weatherCtrl.weatherItems).toEqual([{locale: {id: 8}}])
    })
  })

  function createController (routeParams) {
    return controller('WeatherCtrl', {
      $scope: scope,
      WeatherService: weatherService,
      $routeParams: routeParams
    })
  }

  function createWeatherServiceMock () {
    return {
      findByLocaleId: function (id) {
        var defer = q.defer()
        defer.resolve({locale: {id: id}})
        return defer.promise
      },
      getMainWeathers: function () {
        var defer = q.defer()
        defer.resolve([{locale: {id: 8}}])
        return defer.promise
      }
    }
  }
})
