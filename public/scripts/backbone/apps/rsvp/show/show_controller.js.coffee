@Shft.module "RsvpApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Controller extends App.Controllers.Base

    initialize: ->
      console.log "rsvp.controller initialize"
      if App.request "aside:isopen"
        App.execute "aside:close"
      showView = @getShowView()
      @show showView

    getShowView: ->
      showView = new Show.Article

      # @listenTo showView, "swipe:right", ->
      #   App.vent.trigger "header:swipe:right"

      showView