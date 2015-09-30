describe('variable Service Tests', function(){
  var $variabelService, variableApiService, $q, $rootScope, getVariableOrderSpy, getVariablesSpy, orderJson = {"graph": [
  {
    "Key Performance Indicators": [
    {
      "Net Promoter": [
      "1193e911122742be874251c7501f5b44/",
      "e2c3647faf594f36ac8263b8bf68d0e8/",
      "94402c3a10974bf799a1ab740288d781/",
      "a603c924903f4c0ba0b446ec0e12565b/",
      "be6cb6b488fa4bcb9a0162bd7f3c3367/"
      ]
    },
    "ff30969f836f43e6801789557c683725/"
    ]
  }]},
  variableJson = {"index": {
    "ff30969f836f43e6801789557c683725/": {
      "type": "categorical_array",
      "id": "d9470189421649a79275a6dcfce54b78",
      "name": "Recommendation",
      "description": "How likely are you to recommend . . . [Asked of up to three randomly-assigned browsers respondent is aware of]"
    },
    "e2c3647faf594f36ac8263b8bf68d0e8/": {
      "type": "numeric",
      "id": "e2c3647faf594f36ac8263b8bf68d0e8",
      "name": "Net Promoter -- Internet Explorer",
      "description": "Net Promoter Score"
    }
  }};

  beforeEach(module('yg.api'));
  beforeEach(module('yg.shared.services'));
  beforeEach(inject(function(_variableService_, _variableApiService_, _$q_, _$rootScope_){
   variableService = _variableService_;
   $q = _$q_;
   $rootScope = _$rootScope_;
   variableApiService = _variableApiService_;
 }));
  beforeEach(function(){
    getVariableOrderSpy = spyOn(variableApiService, 'getVariableOrder');
    getVariablesSpy= spyOn(variableApiService, 'getVariables');

    getVariableOrderSpy.and.callFake(function(){
      return $q(function(resolve){
        resolve({
          data :  orderJson
        });
      });
    })

    getVariablesSpy.and.callFake(function(){
     return $q(function(resolve){
      resolve({
        data :  variableJson
      });
    });
   })
  });
  afterEach(function(){
    $rootScope.$apply();
  });

  describe('getOrders', function(){


    it('return graph on success', function(){
      var result = variableService.getOrders().then(function(result){
        expect(result.length).toBe(1)
      }, function(){
        fail('Should be successful');
      })
    });

    it('return empty on failure', function(){
      getVariableOrderSpy.and.callFake(function(){
       return $q(function(resolve, reject){
        reject({
         data :  {'error': ''}
       });
      });
     })

      var result = variableService.getOrders().then(function(result){
        fail('should have failed')
      }, function(result){
        expect(result.length).toBe(0)
      })
    });

  });

  describe('getVariables', function(){

    it('return graph on success', function(){
      var result = variableService.getVariables().then(function(result){
        expect(result["ff30969f836f43e6801789557c683725/"].name).toBe("Recommendation")
      }, function(){
        fail('Should be successful');
      })
    });

    it('return empty on failure', function(){
      getVariablesSpy.and.callFake(function(){
       return $q(function(resolve, reject){
        reject({
         data :  {'error': ''}
       });
      });
     })

      var result = variableService.getVariables().then(function(result){
        fail('should have failed')
      }, function(result){
        expect(Array.isArray(result)).toBeFalsy();
        expect(typeof result).toBe("object");
      })
    });

  })


  describe('getVariablePosition', function(){

    it("Unknown variable name", function(){
     var result = variableService.getVariablePosition('index').then(function(result){
      expect(result).toBe(-1)
    }, function(){
      fail('should not error')
    });
   });

    it("valid variable name", function(){
     var result = variableService.getVariablePosition('Recommendation').then(function(result){
      expect(result).toBe(7)
    }, function(){
      fail('should not error')
    });
   });
  });


  describe('getVariableFromPosition', function(){

    it("Invalid Position", function(){
      var result = variableService.getVariableFromPosition(-100).then(function(result){
      expect(result).toBeUndefined()
    }, function(){
      fail('should not error')
    });
   });

    it("Valid position", function(){
     var result = variableService.getVariableFromPosition(3).then(function(result){
      expect(result.id).toBe("e2c3647faf594f36ac8263b8bf68d0e8")
    }, function(){
      fail('should not error')
    });
   });
  });
});