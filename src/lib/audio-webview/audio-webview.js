export default `
<html>
  <head>
  <style>
    #controls {display: flex; justify-content: center}
    #controls h1 {padding:2rem 2.5rem; color:#005}
    #wait {height:2rem}
  </style>
    <script src="https://cdn.jsdelivr.net/npm/abcjs@6.3.0/dist/abcjs-basic-min.js"></script>
    <script type="text/javascript">
    // will hold timeout for when playback ends
    var playbackTimeout = null;
    var busy = false;

    // global so it can be accessed from stop()
    midiBuffer = new ABCJS.synth.CreateSynth();

    function play(abcText, millisecondsPerMeasure, chordsOff, voicesOff) {
      const visualObj = ABCJS.renderAbc("*", abcText, { responsive: "resize" })[0];

      if (ABCJS.synth.supportsAudio()) {
        window.AudioContext = window.AudioContext ||
          window.webkitAudioContext ||
          navigator.mozAudioContext ||
          navigator.msAudioContext;
        var audioContext = new window.AudioContext();
        audioContext.resume().then(() => {
          return midiBuffer.init({
            visualObj,
            audioContext,
            millisecondsPerMeasure,
            options: {
              chordsOff,
              voicesOff
            }
          }).then(function (response) {
            return midiBuffer.prime();
          }).then(function () {
            midiBuffer.start();
            playbackTimeout = setTimeout(() => {
              window.ReactNativeWebView.postMessage('');
            }, midiBuffer.duration*1000);
          }).catch(function (error) {
            // err
          });
        });
      }
    }

    function playBar(str) {
      if (!busy) {
        setWaitP("Playing...")
        busy = true;
        console.log("playbar", str);

        stop();
        play(str, 2000);

        setTimeout(() => {
          console.log("Wait done");
          busy = false;
          setWaitP("")
        }, 1500);
      }
    }

    function click(el) {
      if (!busy) {
        setWaitP("Playing...")
        busy = true;
        console.log("click", el);

        stop();
        play(el.pitches[0].name, 2000);

        setTimeout(() => {
          console.log("Wait done");
          busy = false;
          setWaitP("")
        }, 1500);
      }
    }

    function setWaitP(str) {
      document.getElementById("wait").innerHTML = str;
    }

    function stop() {
      if (midiBuffer) {
        midiBuffer.stop();
      }
      clearTimeout(playbackTimeout);
    };

    // onLoad
    window.addEventListener("load", (event) => {
      console.log("Audio-webview loaded");
      window.ReactNativeWebView.postMessage('start');
    });

</script>
</head>
  <body>
    <main>
      <div id="display"><h1 style="text-align:center;font-size:3rem;padding-top:10rem;">Loading...</h1></div>
      <hr>
      <p id="wait"></p>
      <div id="controls"></div>
    </main>
  </body>
</html>`;
