@Shft.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

  class Entities.Model extends Backbone.Model

    destroy: (options = {}) ->
      _.defaults options,
        wait: true

      @set _destroy: true
      super options

    isDestroyed: ->
      @get "_destroy"