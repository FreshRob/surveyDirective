'use strict'
angular.module("yg.api", [])
.factory('variableApiService', ["$http", function($http){
	return {
		getVariableOrder: function(){
			return $http.get('/api/order.json',  { cache: true});
		},
		getVariables: function(){
			return $http.get('/api/variables.json',  { cache: true});
		}
	}
}]);