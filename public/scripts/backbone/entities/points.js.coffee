@Shft.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

  class Entities.Points extends Entities.Model

  API =
    getPoints: ->
      new Entities.Points App.request "bootstrap:points"
    updatePoints: (score) ->
      Bootstrap.score = score

  App.reqres.setHandler "points:entity", ->
    API.getPoints()

  App.commands.setHandler "points:update", (score) ->
    console.log "points:update", score
    API.updatePoints score