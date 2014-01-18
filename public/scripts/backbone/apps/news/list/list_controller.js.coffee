@Shft.module "NewsApp.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Controller extends App.Controllers.Base

    initialize: (options) ->
      console.log "page list.controller initialize"

      if App.request "aside:isopen"
        App.execute "aside:close"

      @news = App.request "news:entity"

      showView = @getNewsLayout()

      @show showView

    getNewsLayout: ->
      newsLayout = new List.Layout

      @listenTo newsLayout, "show", =>
        @listRegion newsLayout
        @backgroundRegion newsLayout

      newsLayout

    listRegion: (newsLayout) ->

      listView = @getNewsListView()

      newsLayout.listRegion.show listView

    backgroundRegion: (newsLayout) ->

      backgroundView = @getBackgroundView()

      newsLayout.backgroundRegion.show backgroundView

    getBackgroundView: ->
      new List.Background

    getNewsListView: ->
      sectionsView = new List.PageList
        collection: @news

      # @listenTo sectionsView, "childview:item:clicked", (args) ->
      #   @navigateItem args.model

      # Memory management:
      # clean up controller when this view is closed
      @listenTo sectionsView, "close", @close

      sectionsView