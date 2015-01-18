(function() {
  'use strict';
  function setHexapicTransitionSpeed(ms) {
    CoreStyle.g.transitions.duration = ms + 'ms';
    CoreStyle.g.transitions.scaleDelay = CoreStyle.g.transitions.duration;
  }
  setHexapicTransitionSpeed(350);
  new Polymer('hexapic-app', {
    selected: 'splash',
    minSplashTime: 1000,
    connected: false,
    responsiveWidth: '900px',
    observe: {
      'user': 'startup'
    },
    ready: function() {
      this.readyTime = Date.now();
      if (!this.user) {
        this.startup();
      }
    },

    eventDelegates: {
      'main': 'game'
    },

    showGame: function() {
      console.log('Game');
      this.selected = 'game';
    },

    showProfile: function() {
      this.selected = 'profile';
      this.$.profile.userDefaults = this.user;
    },

    loadScores: function() {
      //TODO: load from local storage
      this.resetScores();
    },
    resetScores: function() {
      if (this.user) {
        this.user.score = 0;
        this.user.playedGames = 0;
      }
    },
    startup: function() {
      var elapsed = Date.now() - this.readyTime;
      var t = this.minSplashTime - elapsed;
      this.async('completeStartup', null, t > 0 ? t : 0);
    },
    completeStartup: function() {
      if (this.user) {
        this.loadScores();
        this.selected = 'game';
      } else {
        this.resetScores();
        this.selected = 'profile';
      }
    }
  });
})();
