import { describeDOM } from "../../../helper/describe-test-helper";
import Button from "../../../../src/ui/components/button";

describeDOM("ui/components/button", function() {

  let button;

  beforeEach(function() {
    button = new Button("BUTTON TEXT");
    this.testContainer.append(button.element());
  });

  it("adds button to the dom", function() {
    let buttons = document.querySelectorAll("button[type=\"button\"]");
    assert.lengthOf(buttons, 1);
    assert.strictEqual(buttons[0].textContent, "BUTTON TEXT");
  });

  it("removes button on destruction", function() {
    button.destroy();

    assert.lengthOf(document.querySelectorAll("button[type=\"button\"]"), 0);
  });

});