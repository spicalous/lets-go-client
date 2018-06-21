const WEB_AUDIO_SUPPORT = "webkitAudioContext" in window || "AudioContext" in window;
const noop = function(){};

function RACE_START(context) {
  const DURATION = 0.5;
  const noteOne = context.createOscillator();
  const noteTwo = context.createOscillator();
  const gain = context.createGain();
  const closeContext = function() {
    noteTwo.removeEventListener("ended", closeContext, false);
    context.close();
  };
  noteTwo.addEventListener("ended", closeContext, false);

  noteOne.frequency.value = 440; // A4
  noteTwo.frequency.value = 880; // A5

  noteOne.connect(gain);
  noteTwo.connect(gain);
  gain.connect(context.destination);

  noteOne.start(0);
  noteTwo.start(0);
  gain.gain.setValueAtTime(0, DURATION);
  gain.gain.setValueAtTime(1, DURATION * 2);
  gain.gain.setValueAtTime(0, DURATION * 3);
  gain.gain.setValueAtTime(1, DURATION * 4);
  gain.gain.setValueAtTime(0, DURATION * 5);
  noteOne.frequency.setValueAtTime(659.25, DURATION * 5); // E5
  noteTwo.frequency.setValueAtTime(1318.5, DURATION * 5); // E6
  gain.gain.setValueAtTime(1, DURATION * 6);
  noteOne.stop(DURATION * 8);
  noteTwo.stop(DURATION * 8);
}

class AudioService {

  constructor() {
    if (!WEB_AUDIO_SUPPORT) {
      this.play =  noop;
    }
    window.s = () => this.play(RACE_START);
  }

  play(sound) {
    sound(new (window.AudioContext || window.webkitAudioContext)());
  }

}

const instance = new AudioService();
export {
  instance as default,
  RACE_START
};