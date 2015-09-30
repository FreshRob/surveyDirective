'use strict'
angular.module("yg.shared.services", [])
.factory("variableService", ['$q', 'variableApiService' , function($q, variableApiService){
	return {
		getVariablePosition: function(variableName){
			return getVariableOrderAndVariables(function(variables, variableOrder){						
				return getVariablePosition(variableName, variables, variableOrder)
			}, function(){
				return -1;
			});
		},
		getVariableFromPosition: function(variablePosition){	
			return getVariableOrderAndVariables(function(variables, variableOrder){
				return getVariableFromPosition(variablePosition, variableOrder, variables);
			}, function(){
				return undefined;
			});
		},
		getOrders: getOrders,
		getVariables: getVariables
	}

	function getOrders(){
		return $q(function(resolve, reject){
			variableApiService.getVariableOrder().then(function(result){
				resolve(result.data.graph);
			}, function(){
				reject([]);
			})
		});
	}

	function getVariables(){
		return $q(function(resolve, reject){
			variableApiService.getVariables().then(function(result){
				resolve(result.data.index);
			}, function(){
				reject({});
			})
		});
	}

	function getVariableFromPosition(variablePosition, variableOrder, variables){
		if(isNaN(variablePosition) || variablePosition < 0 ){
			return undefined;
		}

		var order = getflatListOfOrderedVariables(variableOrder);
		var variableIndex = order[variablePosition];
		return (!variableIndex) ? undefined : variables[variableIndex];
	}

	function getVariableOrderAndVariables(resolve, reject){
		return $q.all([getOrders(), getVariables()]).then(
			function(result){
				var variableOrder = result[0];
				var variables = result[1];
				return resolve(variables, variableOrder);
			}, function(result){
				return reject(result)
			});
	}


	function getVariablePosition(variableName, variables, variableOrder){
		var variableIndex =  getVariableIndex(variableName, variables);	

		if(!variableIndex) {
			return -1
		}

		var order = getflatListOfOrderedVariables(variableOrder);

		for(var i = 0; i < order.length; i++){
			if(order[i] == variableIndex){
				return i;
			}
		}

		return -1;		
	}


	function getflatListOfOrderedVariables(orderItem){
		var list = []
		switch(typeof orderItem){
			case "string":
			list.push(orderItem);
				return list;
			case "object": 
			Object.keys(orderItem).forEach(function(key){

				var childHierarchy = getflatListOfOrderedVariables(orderItem[key])

				if(isNaN(key)){
					list.push(key);
					list = list.concat(childHierarchy)
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

	function getVariableIndex(variableName, variables){
		var keys = Object.keys(variables)
		for(var i = 0; i< keys.length; i++) {
			var key = keys[i];
			var variable = variables[key];
			if(variable.name == variableName) {
				return key;
			}
		}
	}
}])