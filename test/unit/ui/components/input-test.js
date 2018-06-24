import { assert as sassert, stub } from "sinon";
import { describeDOM } from "../../../helper/describe-test-helper";
import { dispatchEvent } from "../../../helper/dom-events";
import Input from "../../../../src/ui/components/input";

describeDOM("ui/components/input", function() {

  let input;

  describe("creating an empty input", function() {

    beforeEach(function() {
      input = new Input();
      this.testContainer.append(input.element());
    });

    it("adds input to the dom", function() {
      assert.lengthOf(document.querySelectorAll("input[type=\"text\"]"), 1);
    });

    it("removes input on destruction", function() {
      input.destroy();

      assert.lengthOf(document.querySelectorAll("input[type=\"text\"]"), 0);
    });

    it("sets the input's value", function() {
      input.setValue("test");

      assert.strictEqual(document.querySelector("input").value, "test");
    });

    describe("with a change handler", function() {

      let changeHandler;

      beforeEach(function() {
        changeHandler = stub();
        input.onChange(changeHandler);
      });

      it("calls the change handler with input event is fired", function() {
        dispatchEvent(input.element(), "input");

        sassert.calledOnce(changeHandler);
      });

      it("setValue does not invoke the change handler", function() {
        input.setValue("test");

        sassert.notCalled(changeHandler);
      });

    });
  });

  describe("creating input with className", function() {

    beforeEach(function() {
      input = new Input({ className: "input-class-name" });
      this.testContainer.append(input.element());
    });

    it("sets the className", function() {
      assert.strictEqual(document.querySelector("input").className, "input-class-name");
    });

  });

  describe("creating input with placeholder", function() {

    beforeEach(function() {
      input = new Input({ placeholder: "input-placeholder" });
      this.testContainer.append(input.element());
    });

    it("sets the placeholder text", function() {
      assert.strictEqual(document.querySelector("input").getAttribute("placeholder"), "input-placeholder");
    });

  });
});