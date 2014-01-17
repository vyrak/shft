@Shft.module "HeaderApp.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Controller extends App.Controllers.Base

    initialize: ->
      console.log "list.controller initialize"
      listView = @getListView()
      @show listView

    getListView: ->
      listView = new List.Header

      @listenTo listView, "button:menu:clicked", ->
        App.vent.trigger "header:button:menu:clicked"

      @listenTo listView, "button:footer:clicked", ->
        App.vent.trigger "header:button:footer:clicked"

      @listenTo listView, "close:clicked", (args) ->
        App.execute "aside:close"

      @listenTo listView, "swipe:left", ->
        App.vent.trigger "header:swipe:left"

      @listenTo listView, "swipe:right", ->
        App.vent.trigger "header:swipe:right"

      listView