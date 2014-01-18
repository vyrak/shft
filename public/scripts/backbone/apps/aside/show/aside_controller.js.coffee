@Shft.module "AsideApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Controller extends App.Controllers.Base

    initialize: ->
      console.log "left.controller initialize"
      App.asideLeftRegion.show @getMenuView()
      App.asideRightRegion.show @getFooterView()

    getMenuView: ->
      menuView = new Show.Menu

      @listenTo menuView, "book-now:clicked", (args) ->
        App.vent.trigger "aside:book-now:clicked", args.view

      @listenTo menuView, "guestbook:clicked", (args) ->
        App.vent.trigger "aside:guestbook:clicked", args.view

      menuView

    getFooterView: ->
      footerView = new Show.Footer
        model: App.request "points:entity"

      @listenTo footerView, "facebook:clicked", (args) ->
        App.vent.trigger "aside:facebook:clicked", args.view

      @listenTo footerView, "youtube:clicked", (args) ->
        App.vent.trigger "aside:youtube:clicked", args.view

      @listenTo footerView, "address:clicked", (args) ->
        App.vent.trigger "aside:address:clicked", args.view

      @listenTo footerView, "phone:clicked", (args) ->
        App.vent.trigger "aside:phone:clicked", args.view

      footerView