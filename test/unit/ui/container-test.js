import { describeDOM } from "../../helper/describe-test-helper";
import Container from "../../../src/ui/container";

describeDOM("ui/container", function() {

  let container;

  beforeEach(function() {
    container = new Container();
    container.initDOM(this.testContainer);
  });

  it("initDom appends a container to element", function() {
    assert.lengthOf(document.querySelectorAll("#test *"), 1);
  });

  it("removes container on destruction", function() {
    container.destroy();

    assert.lengthOf(document.querySelectorAll("#test *"), 0);
  });

});