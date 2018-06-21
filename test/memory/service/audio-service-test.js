import { describeHeadless } from "../../helper/describe-test-helper";
import { startMeasuring, stopMeasuring } from "../../helper/memory-monitor";
import AudioService, { RACE_START } from "../../../src/service/audio-service";

describeHeadless("service/audio", function() {

  // Currently doesnt work: window.gc() hangs execution

  it("play RACE_START", async function() {
    this.timeout(30000);
    await startMeasuring();

    AudioService.play(RACE_START);

    await stopMeasuring();
    // Determine what the memory consumption is by looking at
    // 1. with and without AudioService
    // 2. with AudioService and with AudioService minus cleanup
    // to come up with a sensible value that result should be below
  });

});