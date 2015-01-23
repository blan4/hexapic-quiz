setHexapicTransitionSpeed = (ms) ->
  CoreStyle.g.transitions.duration = "#{ms}ms"
  CoreStyle.g.transitions.scaleDelay = CoreStyle.g.transitions.duration

setHexapicTransitionSpeed 350

Polymer 'hexapic-app',
  selected: 'splash'
  minSplashTime: 1000
  connected: false
  responsiveWidth: '900px'

  observe:
    'user': 'startup'

  ready: () ->
    @readyTime = Date.now()
    @startup() unless @user


  eventDelegates:
    main: 'game'

  showGame: () ->
    console.log 'Game'
    @selected = 'game'

  showProfile: () ->
    @selected = 'profile'
    @$.profile.userDefaults = @user

  loadScores: () ->
    #TODO: load from local storage
    @resetScores()

  resetScores: () ->
    if @user
      @user.score = 0
      @user.playedGames = 0

  startup: () ->
    elapsed = Date.now() - @readyTime
    t = @minSplashTime - elapsed
    @async 'completeStartup', null, t > 0 ? t : 0

  completeStartup: () ->
    if @user
      @loadScores()
      @selected = 'game'
    else
      @resetScores()
      @selected = 'profile'
