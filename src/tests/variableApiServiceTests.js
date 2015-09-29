describe('variable Api Tests', function(){
  var $httpbackend, variableApiService;
  beforeEach(module('yg.api'));
  beforeEach(inject(function(_$httpBackend_, _variableApiService_){
   $httpBackend = _$httpBackend_;
   variableApiService = _variableApiService_;
 }));


  it("Return variables", function(){
    var dataObject = {
      test: "example"          
    }
    $httpBackend.whenGET("/api/variables.json").respond(dataObject);

    variableApiService.getVariables().then(function(result){
      expect(result.data.test).toEqual(dataObject.test)
    });
    $httpBackend.flush();
  })

  it("Return orders", function(){
    var dataObject = {
      test: "order"          
    }
    $httpBackend.whenGET("/api/order.json").respond(dataObject);

    variableApiService.getVariableOrder().then(function(result){
      expect(result.data.test).toEqual(dataObject.test)
    });
    $httpBackend.flush();
  })
});