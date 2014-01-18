@Shft.module "ShareApp", (ShareApp, App, Backbone, Marionette, $, _) ->
  @startWithParent = false

  App.addInitializer ->
    new ShareApp.Router
      controller: API

  class ShareApp.Router extends Marionette.AppRouter
    appRoutes:
      "share" : "show"

  API =
    show: ->
      new ShareApp.Show.Controller
        id: 'home-index'

  # App.vent.on "header:button:clicked", (view) ->
  #   App.redirect "button", target: "_self"