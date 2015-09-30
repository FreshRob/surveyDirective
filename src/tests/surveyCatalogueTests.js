  describe('Survey Catalogue Directive Tests', function(){
    var $variableService, $complile, $q, $rootScope, $templateCache, getVariableOrderSpy, getVariablesSpy, order = [
    {
      "Key Performance Indicators": [
      {
        "Net Promoter": [
        "1193e911122742be874251c7501f5b44/",
        "e2c3647faf594f36ac8263b8bf68d0e8/"
        ]
      }]
    },
    {
      "Chrome Features": [
      "6d303cd227d94ae2a8d74fa0af822125/",
      "15ba91a72de046b7acd22468c3a195c4/"
      ]
    },    
    "ff30969f836f43e6801789557c683725/"
    ],
    variables = {
      "ff30969f836f43e6801789557c683725/": {
        "name": "Test1",
      },
      "1193e911122742be874251c7501f5b44/": {
        "name": "Test2",
      },
      "9191c17025774bdd8196933b93aa68b5/": {
        "name": "Test3",
      },
      "6d303cd227d94ae2a8d74fa0af822125/": {
        "name": "Test4",
      },
      "e2c3647faf594f36ac8263b8bf68d0e8/": {
        "name": "Test5",
      }
    };


    beforeEach(module('templates'));
    beforeEach(module('yg.shared.services'));
    beforeEach(module('yg.survey'));
    beforeEach(module(function($provide){
      variableService = { getOrders : function(){}, getVariables: function(){}}
      $provide.value('variableService', variableService)
    }))
    beforeEach(inject(function(_$q_, _$rootScope_, _$compile_){
     $q = _$q_;
     $rootScope = _$rootScope_;
     $compile  = _$compile_;
   }));

  beforeEach(function(){
     getVariableOrderSpy = spyOn(variableService, 'getOrders')
     getVariablesSpy= spyOn(variableService, 'getVariables')

     getVariableOrderSpy.and.callFake(function(){
      return $q(function(resolve){
        resolve(order);
        });
      })

     getVariablesSpy.and.callFake(function(){
       return $q(function(resolve){
        resolve(variables);
      });
     })
    });

  it("catalogue has correct hierarcy", function(){

     var element = angular.element("<yg-survey-catalogue></yg-survey-catalogue>");  
     $compile(element)($rootScope.$new())  
     $rootScope.$digest();
     var vm = element.controller("ygSurveyCatalogue")
     expect(getVariablesSpy.calls.count()).toBe(1)
     expect(getVariableOrderSpy.calls.count()).toBe(1)
     expect(vm.catalogue.length).toBe(3)
     expect(vm.catalogue[0].name).toBe("Key Performance Indicators");
     expect(vm.catalogue[0].children.length).toBe(1);
     expect(vm.catalogue[0].children[0].name).toBe("Net Promoter");
     expect(vm.catalogue[0].children[0].children.length).toBe(2);
     expect(vm.catalogue[0].children[0].children[0].name).toBe("Test2");
     expect(vm.catalogue[1].name).toBe("Chrome Features");
     expect(vm.catalogue[1].children.length).toBe(2);
     expect(vm.catalogue[1].children[0].name).toBe("Test4");
     expect(vm.catalogue[1].children[1].name).toBeNull();
     expect(vm.catalogue[2].children.length).toBe(0);
     expect(vm.catalogue[2].name).toBe("Test1");
  });    

  it("toggle child Visibility", function(){
     var element = angular.element("<yg-survey-catalogue></yg-survey-catalogue>");  
     $compile(element)($rootScope.$new())  
     $rootScope.$digest();
     var vm = element.controller("ygSurveyCatalogue")
     var model = { childrenVisible: false};
     vm.toggleVisible(model);
     expect(model.childrenVisible).toBeTruthy();
   })
 }); 