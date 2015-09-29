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
				console.log('click')
				catalogue.childrenVisible = !catalogue.childrenVisible;
				console.log('click')
			};

			$q.all([variableService.getOrders(), variableService.getVariables()]).then(function(result){
				var variables = result[1];
				var order = result[0];
				vm.catalogue = hierarchyTest(order, variables);
				return;	
				order.forEach(function(orderItem, index){
					switch(typeof orderItem){
						case "string":
						vm.catalogue.push({
							name: getVariableName(variables, orderItem),
							childrenVisible: false,
							children: []
						});
						return;
						case "object":						
						Object.keys(orderItem).forEach(function(key){
							var model = {
								name: getVariableName(variables, key),
								childrenVisible: false,
								children: []
							}

							orderItem[key].forEach(function(level2){
								switch(typeof level2){
									case "string":
									model.children.push({
										name: getVariableName(variables, level2),
										childrenVisible: false,
										children: []
									});
									return;
									case "object":										
									Object.keys(level2).forEach(function(level3){
										var level2Model = {
											name: getVariableName(variables, level3),
											childrenVisible: false,
											children: []
										};

										level2[level3].forEach(function(level4){
											level2Model.children.push({
												name: getVariableName(variables, level4),
												childrenVisible: false,
												children: []
											})
										});
										model.children.push(level2Model);
									})
									return;
								}
							});
							vm.catalogue.push(model);
						});
}
});				
});

function hierarchyTest(orderList, variableList){
	var list = [],
		orderType = typeof orderList,
		orderIsNumber = !isNaN(orderType);


		if(orderType == "string" && !orderIsNumber){
			list.push({
				name: getVariableName(variableList, orderList),
				childrenVisible: false,
				children: []
			});
			return list;
		}

		if(orderType == "object"){
			Object.keys(orderList).forEach(function(key){
				if(!isNaN(key)){
					hierarchyTest(orderList[key], variableList).forEach(function(item){
					list.push(item);
				});
					return list;
			}
			list.push({
			name: getVariableName(variableList, key),
			childrenVisible: false,
			children: hierarchyTest(orderList[key], variableList)
		});
			})
		return list;
	}
	
	return list;
}

function getVariableName(variableList, variableId){
	if(!variableId.endsWith('/')){
		return variableId;
	}
	var variable = variableList[variableId];
	return !variable ? null : variable.name;
}

function addItemToCatalogue(name, children, visible){
	if(!name){
		return;
	}

	var catalogueChildren = [];
	if(Array.isArray(children)){
		children.forEach(function(name){
			if(!name){
				return;
			}

			catalogueChildren.push({
				name: name
			});
		})

	}

	vm.catalogue.push({
		name: name,
		childrenVisible: visible,
		children: catalogueChildren
	})
}
},
controllerAs: "vs",
link: function(scope, element, attr){

}
}
}]);