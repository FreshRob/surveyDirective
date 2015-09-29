'use strict'
angular.module("yg.survey", []).directive("surveyCatalogue", ["variableService", "$q", function(variableService, $q){
	return {
		scope: {},
		replace: true,
		restrict: 'E',
		templateUrl: 'app/surveyDirective/container.html',
		controller: function(){			
			var vm = this;
			vm.catalogue = [];	
			vm.toggleVisible = function(catalogue){
				catalogue.childrenVisible = !catalogue.childrenVisible;
			};

			$q.all([variableService.getOrders(), variableService.getVariables()]).then(function(result){
				var variables = result[1];
				var order = result[0];
				vm.catalogue = getCatalogueList(order, variables);
				return;					
			});

			function getCatalogueList(orderItem, variableList){
				var list = [];
				switch(typeof orderItem){
					case "string":
						list.push(getCatalogueModel(variableList, orderItem, []));
					return list;
					case "object": 
						Object.keys(orderItem).forEach(function(key){

							var childHierarchy = getCatalogueList(orderItem[key], variableList)

							if(isNaN(key)){
								list.push(getCatalogueModel(variableList, key, childHierarchy));
								return;
							}

							childHierarchy.forEach(function(item){
								list.push(item);
							});
						return list;						
					})
				}
				return list;
			}

			function getCatalogueModel(variableList, variableId, children){
				return {
					name: getVariableName(variableList, variableId),
					childrenVisible: false,
					children: !children ? [] : children
				}
			}

			function getVariableName(variableList, variableId){
				if(!variableId.endsWith('/')){
					return variableId;
				}
				var variable = variableList[variableId];
				return !variable ? null : variable.name;
			}
		},
		controllerAs: "vs"
	}
}]);