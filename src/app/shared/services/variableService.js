'use strict'
angular.module("yg.shared.services", []).
factory("variableService", ['$q', 'variableApiService' , function($q, variableApiService){
	return {
		getVariablePosition: function(variableName){
			return getVariableOrderAndVariables(function(variables, variableOrder){
				var variableIndex =  getVariableIndex(variableName, variables);
				return getVariableOrderPosition(variableIndex, variableOrder)
			}, function(){
				return 0;
			});
		},
		getVaritionFromPosition: function(variablePosition){
			if(isNaN(variablePosition) || variablePosition < 1){
				return $q(function(resolve, reject){
					reject(undefined)
				});
			}

			return getVariableOrderAndVariables(function(variables, variableOrder){
				return getVariableFromPosition(variablePosition, variableOrders, variables);
			}, function(){
				return 0;
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
				reject([]);
			})
		});
	}

	function getVariableFromPosition(variablePosition, variableOrders, variables){
		var order = getOrder1LayerList(variableOrder);
		var varibleIndex = order[variablePosition];
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


	function getVariableOrderPosition(variableIndex, variableOrder){
		var order = getOrder1LayerList(variableOrder);

		for(var i = 0; i < order.length; i++){
			if(order[i] == variableIndex){
				return i;
			}
		}

		return 0;		
	}

	function getOrder1LayerList(variableOrder){
		var order = [];
		variableOrder.forEach(function(orderItem){
			switch(typeof orderItem){
				case "string":
				order.push(orderItem);
				return;
				case "object":
				Object.keys(orderItem).forEach(function(key){
					orderItem[key].forEach(function(item){
						order.push(item)
					})
				});		
				return;
			}	
		});
		return order;
	};

	function getVariableIndex(variableName, variables){
		var keys = Object.keys(variables)
		for(var i = 0; i< keys.length; i++) {
			if(i.name == variableName) {
				return keys[i];
			}
		}
	}
}])