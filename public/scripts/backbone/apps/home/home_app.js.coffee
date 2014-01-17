@Shft.module "MapApp", (MapApp, App, Backbone, Marionette, $, _) ->
  @startWithParent = false

  App.addInitializer ->
    new MapApp.Router
      controller: API

  class MapApp.Router extends Marionette.AppRouter
    appRoutes:
      "home" : "show"

  API =
    show: ->
      new MapApp.Show.Controller
        id: 'home-index'

  # App.vent.on "header:button:clicked", (view) ->
  #   App.redirect "button", target: "_self"