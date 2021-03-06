import { assert as sassert, stub } from "sinon";
import Model from "../../../src/module/model";

describe("module/model", function() {

  let aHandler;
  let bHandler;
  let model;

  beforeEach(function() {
    aHandler = stub();
    bHandler = stub();
    model = new Model(["a", "b"]);
    model.on("a", aHandler);
    model.on("b", bHandler);
  });

  it("can be instantiated without any props", function() {
    assert.doesNotThrow(function() {
      new Model();
    });
  });

  it("fires events when the property has been set", function() {
    model.a = "test";

    sassert.calledOnce(aHandler);
    sassert.calledWithExactly(aHandler, "test");
    sassert.notCalled(bHandler);
  });

  it("returns the same value", function() {
    let value = {};
    model.a = value;

    assert.strictEqual(model.a, value);
  });

  it("unsubscribing does not call handler", function() {
    model.off("a");

    model.a = "test";

    sassert.notCalled(aHandler);
    sassert.notCalled(bHandler);
  });

});