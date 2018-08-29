import { assert as sassert, stub } from "sinon";
import { describeDOM } from "../../helper/describe-test-helper";
import Factory from "../../../src/module/factory";

describeDOM("module/factory", function() {

  let stubModel;
  let stubModelInstance;
  let stubController;
  let stubControllerInstance;
  let stubRenderer;
  let stubRendererInstance;
  let factory;

  beforeEach(function() {
    stubModel = function() {
      this.destroy = stub();
      stubModelInstance = this;
    };
    stubController = function(model, argOne, argTwo) {
      this.argOne = argOne;
      this.argTwo = argTwo;
      this.destroy = stub();
      stubControllerInstance = this;
    };
    stubRenderer = function() {
      this.destroy = stub();
      stubRendererInstance = this;
    };

    factory = new Factory(stubModel, stubController, stubRenderer);
  });

  it("exposes destructor function", function() {
    let module = factory.build(this.testContainer);

    module.destroy();

    sassert.calledOnce(stubModelInstance.destroy);
    sassert.calledOnce(stubControllerInstance.destroy);
    sassert.calledOnce(stubRendererInstance.destroy);
  });

  it("passes arguments to the controller", function() {
    let argOne = {};
    let argTwo = {};

    factory.build(this.testContainer, argOne, argTwo);

    assert.strictEqual(stubControllerInstance.argOne, argOne);
    assert.strictEqual(stubControllerInstance.argTwo, argTwo);
  });

});