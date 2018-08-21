import { stub } from "sinon";
import { describeDOM } from "../../helper/describe-test-helper";
import Controller from "../../../pages/game/module/lobby-controller";
import Model from "../../../pages/game/module/lobby-model";
import Renderer from "../../../pages/game/module/lobby-renderer";

describeDOM("module/lobby", function() {

  let stubSocket;
  let model;
  let controller;
  let renderer;

  beforeEach(function() {
    stubSocket = {
      id: "A1",
      emit: stub(),
      on: stub(),
      off: stub()
    };
    model = new Model();
    controller = new Controller(model, stubSocket);
    renderer = new Renderer(this.testContainer, model, controller);
  });

  afterEach(function() {
    renderer.destroy();
    controller.destroy();
    model.destroy();
  });

  describe("players update when socket id is leader", function() {

    beforeEach(function() {
      stubSocket.on.firstCall.args[1]("A1", [{ id: "A1" },{ id: "B2" }]);
    });

    it("displays correct number of players", function() {
      assert.lengthOf(document.querySelectorAll(".players-container div"), 2);
    });

    it("displays the start button", function() {
      assert.isOk(document.querySelector("button"));
    });

    describe("a new player joins", function() {

      beforeEach(function() {
        stubSocket.on.firstCall.args[1]("A1", [{ id: "A1" },{ id: "B2" },{ id: "C3" }]);
      });

      it("displays correct number of players", function() {
        assert.lengthOf(document.querySelectorAll(".players-container div"), 3);
      });

      it("displays the start button", function() {
        assert.isOk(document.querySelector("button"));
        assert.isNull(document.querySelector(".lobby-info"));
      });

    });

  });

  describe("players update when socket id is NOT leader", function() {

    beforeEach(function() {
      stubSocket.on.firstCall.args[1]("B2", [{ id: "A1" },{ id: "B2" }]);
    });

    it("displays correct number of players", function() {
      assert.lengthOf(document.querySelectorAll(".players-container div"), 2);
    });

    it("displays the lobby info", function() {
      assert.isOk(document.querySelector(".lobby-info"));
      assert.isNull(document.querySelector("button"));
    });

  });
});