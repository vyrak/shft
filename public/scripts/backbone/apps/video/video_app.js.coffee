@Shft.module "VideoApp", (VideoApp, App, Backbone, Marionette, $, _) ->
  @startWithParent = false

  App.addInitializer ->
    new VideoApp.Router
      controller: API

  class VideoApp.Router extends Marionette.AppRouter
    appRoutes:
      "video" : "show"

  API =
    show: ->
      new VideoApp.Show.Controller
        id: 'home-index'

  # App.vent.on "header:button:clicked", (view) ->
  #   App.redirect "button", target: "_self"