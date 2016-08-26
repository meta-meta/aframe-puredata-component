if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

var warn = console.warn;

AFRAME.registerSystem('puredata', {
  init: function () {
    this.Pd = require('webpd');
  },
});

var axios = require('axios');

/**
 * Sound component.
 */
AFRAME.registerComponent('puredata', {
  schema: {
    src: { type: 'src' },
  },

  multiple: true,

  init: function () {
    this.listener = null;
    this.sound = null;
  },

  update: function (oldData) {
    var data = this.data;
    var sound = this.sound;
    var srcChanged = data.src !== oldData.src;
    // Create new sound if not yet created or changing `src`.
    if (srcChanged) {
      if (!data.src) {
        warn('Audio source was not specified with `src`');
        return;
      }
      sound = this.setupSound();
    }
  },

  remove: function () {
    this.el.removeObject3D(this.attrName);

    this.system.Pd.destroyPatch(this.patch);

    try {
      this.sound.disconnect();
    } catch (e) {
      // disconnect() will throw if it was never connected initially.
      warn('Audio source not properly disconnected');
    }
  },

  play: function () {
  },

  pause: function () {
  },
  
  message: function (inletIndex, args) {
    this.patch.i(inletIndex).message(args);
  },

  /**
   * Removes current sound object, creates new sound object, adds to entity.
   *
   * @returns {object} sound
   */
  setupSound: function () {
    var el = this.el;
    var sceneEl = el.sceneEl;

    // Only want one AudioListener. Cache it on the scene.
    var listener = this.listener = sceneEl.audioListener || new THREE.AudioListener();
    sceneEl.audioListener = listener;

    if (sceneEl.camera) {
      sceneEl.camera.add(listener);
    }

    // Wait for camera if necessary.
    sceneEl.addEventListener('camera-set-active', function (evt) {
      evt.detail.cameraEl.getObject3D('camera').add(listener);
    });

    var sound = this.sound || new THREE.PositionalAudio(listener);

    if(this.patch) {
      this.system.Pd.destroyPatch(this.patch);
    }

    axios.request(this.data.src, { responseType: 'text' })
      .then(function (res) {
        var patchStr = res.data;
        this.patch = this.system.Pd.loadPatch(patchStr);
        sound.setNodeSource(this.patch.o(0).getOutNode());
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      });

    if(!this.system.Pd.isStarted()) {
      this.system.Pd.start({
        audioContext: listener.context,
      });
    }

    el.setObject3D(this.attrName, sound);
    return sound;
  }
});