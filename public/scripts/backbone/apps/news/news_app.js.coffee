@Shft.module "NewsApp", (NewsApp, App, Backbone, Marionette, $, _) ->
  @startWithParent = false

  App.addInitializer ->
    new NewsApp.Router
      controller: API

  class NewsApp.Router extends Marionette.AppRouter
    appRoutes:
      "news" : "list"

  API =
    list: (group, options = false) ->

      if !options
        # accessing via URL instead of 'page:show' command
        options = {}

      _.defaults options,
        group: group
        region: App.articleRegion

      new NewsApp.List.Controller options
