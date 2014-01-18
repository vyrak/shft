@Shft.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

  API =
    fetchNews: ->
      Localboot.news
    fetchPoints: ->
      points: Bootstrap.score

  App.reqres.setHandler "bootstrap:news", ->
    API.fetchNews()

  App.reqres.setHandler "bootstrap:points", ->
    API.fetchPoints()