@Shft.module "Views", (Views, App, Backbone, Marionette, $, _) ->
  
  _remove = Marionette.View::remove
 
  _.extend Marionette.View::,

    setInstancePropertiesFor: (args...) ->
      for key, val of _.pick(@options, args...)
        @[key] = val

    remove: (args...) ->
      # console.log "removing", @
      _remove.apply @, args

    resetScroll: ->
      window.scrollTo(0,1)

    clearFocus: ->
      @.$el.find('input').blur()