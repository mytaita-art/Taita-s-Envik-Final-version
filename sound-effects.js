(function () {
  let context;
  let output;

  function getContext() {
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)();

      const compressor = context.createDynamicsCompressor();
      const delay = context.createDelay(0.5);
      const feedback = context.createGain();
      const echoLevel = context.createGain();

      delay.delayTime.value = 0.16;
      feedback.gain.value = 0.18;
      echoLevel.gain.value = 0.22;

      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(echoLevel);
      echoLevel.connect(compressor);
      compressor.connect(context.destination);

      output = {
        dry: compressor,
        echo: delay
      };
    }
    if (context.state === "suspended") context.resume();
    return context;
  }

  function tone(frequency, start, duration, options = {}) {
    const audio = getContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = options.wave || "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    if (options.endFrequency) {
      oscillator.frequency.exponentialRampToValueAtTime(options.endFrequency, start + duration);
    }

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(options.volume || 0.1, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    const filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = options.brightness || 5200;

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(output.dry);

    if (options.echo !== false) {
      gain.connect(output.echo);
    }
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  function play(type) {
    const now = getContext().currentTime + 0.01;

    if (type === "click") {
      tone(440, now, 0.12, {
        wave: "triangle",
        endFrequency: 660,
        volume: 0.055,
        brightness: 3800
      });
      tone(880, now + 0.035, 0.1, { volume: 0.025 });
    } else if (type === "correct") {
      tone(659.25, now, 0.32, { wave: "sine", volume: 0.075 });
      tone(830.61, now + 0.085, 0.38, { wave: "sine", volume: 0.085 });
      tone(987.77, now + 0.17, 0.44, { wave: "triangle", volume: 0.07 });
      tone(1318.51, now + 0.26, 0.58, { wave: "sine", volume: 0.045 });
      tone(1975.53, now + 0.34, 0.42, { wave: "sine", volume: 0.018 });
    } else if (type === "wrong") {
      tone(392, now, 0.28, {
        wave: "sine",
        endFrequency: 329.63,
        volume: 0.06,
        brightness: 2400
      });
      tone(293.66, now + 0.14, 0.35, {
        wave: "triangle",
        endFrequency: 261.63,
        volume: 0.045,
        brightness: 1900
      });
    } else if (type === "win") {
      [523.25, 659.25, 783.99, 987.77, 1318.51].forEach((note, index) => {
        tone(note, now + index * 0.105, 0.5, {
          wave: index % 2 ? "sine" : "triangle",
          volume: 0.07
        });
      });
      tone(783.99, now + 0.57, 0.85, { volume: 0.05 });
      tone(987.77, now + 0.57, 0.9, { volume: 0.06 });
      tone(1318.51, now + 0.57, 1.0, { volume: 0.045 });
      tone(2093, now + 0.7, 0.65, { volume: 0.018 });
    }
  }

  window.GameSounds = { play };
})();
