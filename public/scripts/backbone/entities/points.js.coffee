@Shft.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

  class Entities.Points extends Entities.Model

  API =
    getPoints: ->
      new Entities.Points App.request "bootstrap:points"

  App.reqres.setHandler "points:entity", ->
    API.getPoints()
