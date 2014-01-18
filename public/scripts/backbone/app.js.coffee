@Shft = do (Backbone, Marionette) ->
  
  App = new Marionette.Application
  App.initialized = false
  App.rootRoute = Routes.default_route()

  console.log "app loaded"
  App.on "initialize:before", (options) ->
    console.log "app environment #{options.environment}"
    App.environment = options.environment
    App.url = options.url
    App.isTouch = ("ontouchstart" of window) or window.DocumentTouch and document instanceof DocumentTouch
    if App.isTouch then touchCss = 'is-touch' else touchCss = 'no-touch'
    $('html').addClass(touchCss)

  App.addRegions
    headerRegion: "body > section > header"
    articleRegion: "section > article"
    asideLeftRegion: "#aside-left"
    asideRightRegion: "#aside-right"

  App.addInitializer ->
    App.module("HeaderApp").start()
    App.module("AsideApp").start()

  App.reqres.setHandler "default:region", ->
    App.articleRegion

  App.commands.setHandler "register:instance", (instance, id) ->
    App.register instance, id if App.environment is "development"

  App.commands.setHandler "unregister:instance", (instance, id) ->
    App.unregister instance, id if App.environment is "development"

  App.commands.setHandler "history:back", ->
    App.historyBack()

  App.on "initialize:after", ->
    @startHistory()

    @navigate(@rootRoute, trigger: true) unless @getCurrentRoute()

    App.initialized = true

  App