describe('SearchLocalesCtrl Spec', function () {
  var scope, controller, q, localesService, location

  beforeEach(function () {
    module('climate')
  })

  beforeEach(inject(function ($controller, $rootScope, $q, $location) {
    scope = $rootScope.$new()
    localesService = createLocalesServiceMock()
    q = $q
    location = $location

    controller = $controller('SearchLocalesCtrl', {
      $scope: scope,
      $location: location,
      LocalesService: localesService
    })
  }))

  describe('suggestion', function () {
    it('should call LocalesService.search and update localesFound', function () {
      controller.suggestion()
      scope.$digest()
      expect(controller.localesFound).toEqual([{locale: {id: 1}}])
    })
  })

  describe('showWeatherLocale', function () {
    it('should redirect to weather page', function () {
      spyOn(location, 'path').and.callThrough()
      spyOn(location, 'search')
      controller.locale = {id: 1}
      controller.showWeatherLocale()
      expect(location.path).toHaveBeenCalledWith('/weather')
      expect(location.search).toHaveBeenCalledWith({localeId: 1})
    })
  })

  function createLocalesServiceMock () {
    return {
      search: function () {
        var defer = q.defer()
        defer.resolve([{locale: {id: 1}}])
        return defer.promise
      }
    }
  }
})
