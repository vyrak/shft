@Shft.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

  API =
    fetchNews: ->
      Localboot.news

  App.reqres.setHandler "bootstrap:news", ->
    API.fetchNews()
