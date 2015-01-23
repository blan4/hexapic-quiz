(function() {
  'use strict';

  new Polymer('hexapic-profile', {
    // tab through the input fields on "Enter"
    keypressAction: function(ev) {
      var code = ev.keyCode || ev.charCode;
      var key = ev.keyIdentifier;
      if (key === 'Enter' || code === 13) {
        var target = ev.target;
        if (target === this.$.name) {
          // TODO(dfreedm): calling the focus event handler in lieu of a real api
          this.$.name.blur();
        }
      }
    },
    ready: function() {
      if (!this.user) {
        this.selectRandomAvatar();
      }
    },
    selectRandomAvatar: function() {
      this.selectedAvatar = Math.floor(Math.random() * 16);
    },
    userDefaultsChanged: function() {
      if (this.userDefaults) {
        var n = this.userDefaults.name;
        this.$.name.value = n.substring(0, n.length-2);
        this.selectedAvatar = this.userDefaults.avatar - 1;
        this.score = this.userDefaults.score;
      } else {
        this.$.name.value = '';
        this.selectRandomAvatar();
        this.score = 0;
      }
    },
    handleLogin: function() {
      this.user = {
        name: this.$.name.value,
        avatar: this.selectedAvatar + 1,
        score: this.score || 0
      };
      console.log(this.user);
    },
    handleLogout: function() {
      this.user = null;
      this.userDefaults = null;
    }
  });
})();
