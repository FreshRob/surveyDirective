angular.module("yg", ["ngRoute", "yg.shared.services", "yg.survey", "yg.api"])
 .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<div> Hello world {{helloWorld}} <survey-catalogue></survey-catalogue></div>',
        controller: function($scope, variableService){
          console.log('controller loaded')
        	var x = variableService.getVariablePosition();
        	$scope.helloWorld = "moo"
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
