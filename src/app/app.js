angular.module("yg", ["ngRoute", "yg.api", "yg.shared.services", "yg.survey"])
 .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<yg-survey-catalogue></yg-survey-catalogue>'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);