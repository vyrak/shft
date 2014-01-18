@Shft.module "RsvpApp", (RsvpApp, App, Backbone, Marionette, $, _) ->
  @startWithParent = false

  App.addInitializer ->
    new RsvpApp.Router
      controller: API

  class RsvpApp.Router extends Marionette.AppRouter
    appRoutes:
      "rsvp" : "show"

  API =
    show: ->
      new RsvpApp.Show.Controller
        id: 'home-index'

  # App.vent.on "header:button:clicked", (view) ->
  #   App.redirect "button", target: "_self"