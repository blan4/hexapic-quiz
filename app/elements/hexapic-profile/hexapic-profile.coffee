Polymer 'hexapic-profile',
  # tab through the input fields on "Enter"
  keypressAction: (ev) ->
    code = ev.keyCode || ev.charCode
    key = ev.keyIdentifier
    if key == 'Enter' || code == 13
      target = ev.target
      if target == @$.name
        # TODO(dfreedm): calling the focus event handler in lieu of a real api
        @$.name.blur();

  ready: ()->
    @selectRandomAvatar() unless @user

  selectRandomAvatar: () ->
    @selectedAvatar = Math.floor Math.random() * 16

  userDefaultsChanged: () ->
    if @userDefaults
      n = @userDefaults.name
      @$.name.value = n.substring(0, n.length-2)
      @selectedAvatar = @userDefaults.avatar - 1
      @score = @userDefaults.score
    else
      @$.name.value = ''
      @selectRandomAvatar()
      @score = 0

  handleLogin: () ->
    @user =
      name: @$.name.value
      avatar: @selectedAvatar + 1
      score: @score || 0
    console.log(@user)

  handleLogout: () ->
    @user = null
    @userDefaults = null
