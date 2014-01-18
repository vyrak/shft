@Shft.module "CheckinApp", (CheckinApp, App, Backbone, Marionette, $, _) ->
  @startWithParent = false

  App.addInitializer ->
    new CheckinApp.Router
      controller: API

  class CheckinApp.Router extends Marionette.AppRouter
    appRoutes:
      "checkin" : "show"

  API =
    show: ->
      new CheckinApp.Show.Controller
        id: 'home-index'

  # App.vent.on "header:button:clicked", (view) ->
  #   App.redirect "button", target: "_self"