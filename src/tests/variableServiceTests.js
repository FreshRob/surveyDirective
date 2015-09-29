describe('variable Service Tests', function(){
  var $variabelService, variableApiService, $q, $rootScope;
  beforeEach(module('yg.api'));
  beforeEach(module('yg.shared.services'));
  beforeEach(inject(function(_variableService_, _variableApiService_, _$q_, _$rootScope_){
   variableService = _variableService_;
   $q = _$q_;
   $rootScope = _$rootScope_;
   variableApiService = _variableApiService_;
   jasmine.getJSONFixtures().fixturesPath='base/api';
 }));

describe('getVariablePosition', function(){
  it("Return variables", function(){
     var getVariableOrderSpy = spyOn(variableApiService, 'getVariableOrder')
     , getVariablesSpy= spyOn(variableApiService, 'getVariables')

     getVariableOrderSpy.and.callFake(function(){
        return $q(function(resolve){
            resolve({
              data :  getJSONFixture('order.json')
            });
        });
      })

     getVariablesSpy.and.callFake(function(){
         return $q(function(resolve){
            resolve({
              data :  getJSONFixture('variables.json')
            });
        });
      })

     
      var result = variableService.getVariablePosition('index').then(function(){
          alert('hello mr');
      }, function(){
          fail('should not error')
      });
      $rootScope.$apply();
     
  })
})

  


});